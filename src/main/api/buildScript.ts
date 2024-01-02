/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import TowerGeometry from "@models/TowerGeometry.model";
import ConductorType from "@models/ConductorType.model";
import {
    Circuit,
    Fault,
    GeneralStudy,
    Line,
    LineGeometry,
    LineSpacing,
    Reactor,
    Vsource,
    WireData,
} from "opendss-node-interface";

interface TransmissionLineObjects {
    line: Line;
    reactor: Reactor;
}

interface SourceObjects {
    source: Vsource;
    reactor: Reactor;
}

interface CircuitObjects {
    source: Vsource;
    reactor: Reactor;
}

async function findTowerGeometry(towerGeometryId: string | number) {
    const id =
        typeof towerGeometryId === "string"
            ? parseInt(towerGeometryId, 10)
            : towerGeometryId;

    const towerGeometry = await TowerGeometry.findOne({
        where: { id },
    });
    if (!towerGeometry) throw Error(`Can't find geometry ${id}`);
    return towerGeometry;
}

async function findConductorType(conductorTypeId: number | string) {
    const id =
        typeof conductorTypeId === "string"
            ? parseInt(conductorTypeId, 10)
            : conductorTypeId;
    const conductorType = await ConductorType.findOne({ where: { id } });
    if (!conductorType) throw Error(`Can't find conductor ${id}`);
    return conductorType;
}

interface Project {
    sources: Source[];
    transmissionLines: TransmissionLine[];
}

export async function buildCircuit(project: Project) {
    const sourceObjects: SourceObjects[] = [];
    const transmissionLineObjects: TransmissionLineObjects[] = [];
    const { sources, transmissionLines } = project;
    function findSource(id: string) {
        // const source = sources[id];
        const source = sources.find((source) => source.id === id);
        if (!source) throw Error(`Can't find source ${id}`);
        return source;
    }
    console.log("Building Circuit");

    const study = new GeneralStudy();
    const circuitSource = sources[0];
    const circuit = new Circuit(circuitSource.name, {
        bus1: `B_${circuitSource.name}`,
        phases: circuitSource.phases,
        basekv: circuitSource.voltage,
        x1r1: circuitSource.x1r1,
        Isc1: circuitSource.Isc1,
        Isc3: circuitSource.Isc3,
        x0r0: circuitSource.x0r0,
    });
    const circuitReactor = new Reactor(`${circuitSource.name}_RT`, {
        bus1: `B_${circuitSource.name}.99`,
        bus2: `B_${circuitSource.name}.0`,
        R: circuitSource.resistance,
        X: 0,
        phases: 1,
    });
    study.add(circuit);
    study.add(circuitReactor);
    const circuitObjects = { source: circuit, reactor: circuitReactor };
    sources.slice(1).forEach((source) => {
        const vSource = new Vsource(source.name, {
            bus1: `B_${source.name}`,
            phases: source.phases,
            basekv: source.voltage,
            x1r1: source.x1r1,
            isc1: source.Isc1,
            isc3: source.Isc3,
            x0r0: source.x0r0,
        });
        study.add(vSource);
        const reactor = new Reactor(`${source.name}_RT`, {
            bus1: `B_${source.name}.99`,
            bus2: `B_${source.name}.0`,
            R: source.resistance,
            X: 0,
            phases: 1,
        });
        study.add(reactor);

        sourceObjects.push({ source: vSource, reactor });
    });

    const allGeometries = transmissionLines
        .map((line) => line.towers.map((tower) => tower.geometry))
        .flat();
    const uniqueGeometries = [...new Set(allGeometries)];

    for await (const geometryId of uniqueGeometries) {
        const lineSpacing = await findTowerGeometry(geometryId);
        const lineSpacingClass = new LineSpacing({
            name: lineSpacing.name,
            nConds: lineSpacing.conductors.length,
            nPhases: lineSpacing.conductors.length,
            x: lineSpacing.conductors.map((conductor) => conductor.x),
            h: lineSpacing.conductors.map((conductor) => conductor.y),
            units: "m",
        });
        study.add(lineSpacingClass);
    }

    const allWireDataTypes = transmissionLines
        .map((line) => line.conductors.map((conductor) => conductor.type))
        .flat();
    const uniqueWireDataTypes = [...new Set(allWireDataTypes)];
    uniqueWireDataTypes.map(async (typeId) => {
        const wireData = await findConductorType(typeId);

        const wireDataClass = new WireData(wireData.name, {
            diam: wireData.outerDiameter,
            gmrac: wireData.gmr,
            rac: wireData.acResistance75,
            radUnits: "mm",
            gmrUnits: "mm",
            rUnits: "km",
        });
        study.add(wireDataClass);
        return wireDataClass;
    });

    for await (const line of transmissionLines) {
        const wireNames: string[] = [];
        for await (const conductorInput of line.conductors) {
            const conductorClass = await findConductorType(conductorInput.type);
            wireNames.push(conductorClass.name);
        }

        const allGeometryIds = line.towers.map((tower) => tower.geometry);
        const uniqueGeometries = [...new Set(allGeometryIds)];

        for await (const geometryId of uniqueGeometries) {
            const geometry = await findTowerGeometry(geometryId);
            const geometryClass = new LineGeometry(
                `${line.name}_${geometry.name}`,
                {
                    nconds: line.conductors.length,
                    nphases: line.conductors.length,
                    spacing: geometry.name,
                    reduce: false,
                    wires: wireNames,
                }
            );
            study.add(geometryClass);
        }

        // START OF TRANSMISSION LINE
        const numNeutrals = 2;
        const fromSource = findSource(line.fromSource);
        const toSource = findSource(line.toSource);
        const numConductors = line.conductors.length;
        const fromPhases = line.conductors.map(
            (transmissionLine) => transmissionLine.fromPhase
        );
        const intermediatePhases = [...Array(numConductors).keys()].map(
            (i) => i + 1
        ); // array from 1 to numPhases
        const toPhases = line.conductors.map(
            (transmissionLine) => transmissionLine.toPhase
        );

        const initialPhases = fromPhases.join(".");
        const middlePhases = intermediatePhases.join(".");
        const finalPhases = toPhases.join(".");
        const neutralBus1Phases = intermediatePhases
            .slice(-numNeutrals)
            .join(".");
        const neutralBus2Phases = new Array(numNeutrals).fill(0).join(".");
        let index = 0;

        for await (const tower of line.towers) {
            const name = `${tower.name}`;
            const geometry = await findTowerGeometry(tower.geometry);
            const towerNumber = index + 1;
            if (towerNumber === 1) {
                const lineClass = new Line(`${line.name}_S${towerNumber}`, {
                    bus1: `B_${fromSource.name}.${initialPhases}`,
                    bus2: `${name}.${middlePhases}`,
                    phases: numConductors,
                    length: tower.distance,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });
                const reactorClass = new Reactor(`${name}_RT`, {
                    bus1: `${name}.${neutralBus1Phases}`,
                    bus2: `${name}.${neutralBus2Phases}`,
                    R: tower.resistance,
                    X: 0,
                    phases: numNeutrals,
                });
                study.add(lineClass);
                study.add(reactorClass);
                transmissionLineObjects.push({
                    line: lineClass,
                    reactor: reactorClass,
                });
            } else {
                const prevName = `${line.towers[index - 1].name}`;
                const lineClass = new Line(`${line.name}_S${towerNumber}`, {
                    bus1: `${prevName}.${middlePhases}`,
                    bus2: `${name}.${middlePhases}`,
                    length: tower.distance,
                    phases: numConductors,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });

                const reactorClass = new Reactor(`${name}_RT`, {
                    bus1: `${name}.${neutralBus1Phases}`,
                    bus2: `${name}.${neutralBus2Phases}`,
                    R: tower.resistance,
                    X: 0,
                    phases: numNeutrals,
                });
                study.add(lineClass);
                study.add(reactorClass);
                transmissionLineObjects.push({
                    line: lineClass,
                    reactor: reactorClass,
                });

                if (towerNumber === line.towers.length) {
                    const lineClass = new Line(
                        `${line.name}_S${towerNumber + 1}`,
                        {
                            bus1: `${name}.${middlePhases}`,
                            bus2: `B_${toSource.name}.${finalPhases}`,
                            length: tower.distance, // FIXME: This is wrong, assuming the last line to substation is same as previous
                            phases: numConductors,
                            units: "km",
                            geometry: `${line.name}_${geometry.name}`,
                        }
                    );
                    study.add(lineClass);
                }
            }
            index += 1;
        }
    }
    return {
        study,
        circuitObjects,
        sourceObjects,
        transmissionLineObjects,
    };
}

export async function solveFault(
    study: GeneralStudy,
    circuitObjects: CircuitObjects,
    sourceObjects: SourceObjects[],
    transmissionLineObjects: TransmissionLineObjects[]
) {
    const results: Array<Array<string | number>> = [];
    const fault = new Fault("SHORT_CIRCUIT", {
        bus1: `B_${circuitObjects.source.name}.1`,
        bus2: `B_${circuitObjects.source.name}.99`,
        phases: 1,
    });
    study.add(fault);

    study.build();
    study.setOptions({
        voltagebases: [230],
        earthModel: "FullCarson",
    });
    await study.saveScript("./script.dss");

    study.solve();
    // READING RESULTS - CIRCUIT
    const current1 = study.readCurrent(circuitObjects.reactor, 1);
    results.push([circuitObjects.source.name, current1]);
    // READING RESULTS - OTHER SOURCES
    sourceObjects.forEach(({ source, reactor }) => {
        study.changeParameter(fault, "bus1", `B_${source.name}.1`);
        study.changeParameter(fault, "bus2", `B_${source.name}.99`);
        study.solve();
        const current1 = study.readCurrent(reactor, 1);
        results.push([source.name, current1]);
    });

    // READING RESULTS - TRANSMISSION LINES
    study.changeParameter(fault, "phases", "2");
    transmissionLineObjects.forEach(({ reactor }) => {
        const busName = reactor.bus1!.split(".")[0];
        study.changeParameter(fault, "bus1", `${busName}.1`);
        study.changeParameter(fault, "bus2", `${busName}.7`);
        study.solve();
        const current1 = study.readCurrent(reactor, 1);
        results.push([reactor.name, current1]);
    });
    return results;
}
