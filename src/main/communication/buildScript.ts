import conductors from "@shared/conductorTypes.json";
import geometries from "@shared/geometries.json";
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

function findGeometry(geometryId: string | number) {
  const id = typeof geometryId === "string" ? parseInt(geometryId) : geometryId;
  const geometry = geometries.find((geometry) => geometry.id === id);
  if (!geometry) throw Error(`Can't find geometry ${id}`);
  return geometry;
}

function findConductor(conductorId: number | string) {
  const id =
    typeof conductorId === "string" ? parseInt(conductorId) : conductorId;
  const conductor = conductors.find((conductor) => conductor.id === id);
  if (!conductor) throw Error(`Can't find conductor ${id}`);
  return conductor;
}

export default async function buildCircuit(
  sources: SourceInput[],
  transmissionLines: TransmissionLineInput[]
) {
  function findSource(sourceId: number | string) {
    const id = typeof sourceId === "string" ? parseInt(sourceId) : sourceId;
    const source = sources[id];
    //const source = sources.find((source) => source === id);
    if (!source) throw Error(`Can't find source ${id}`);
    return source;
  }
  const results: Array<Array<string | number>> = [];
  const study = new GeneralStudy();
  const circuit = new Circuit(sources[0].name, {
    bus1: `B_${sources[0].name}`,
    phases: sources[0].phases,
    basekv: sources[0].voltage,
    x1r1: sources[0].x1r1,
    Isc1: sources[0].Isc1,
    Isc3: sources[0].Isc3,
    x0r0: sources[0].x0r0,
  });
  study.add(circuit);
  const reactor = new Reactor(sources[0].name + "_RT", {
    bus1: `B_${sources[0].name}.99`,
    bus2: `B_${sources[0].name}.0`,
    R: sources[0].resistance,
    X: 0,
    phases: 1,
  });
  study.add(reactor);
  sources.slice(1).forEach((source) => {
    const circuit = new Vsource(source.name, {
      bus1: `B_${source.name}`,
      phases: source.phases,
      basekv: source.voltage,
      x1r1: source.x1r1,
      isc1: source.Isc1,
      isc3: source.Isc3,
      x0r0: source.x0r0,
    });
    study.add(circuit);
    const reactor = new Reactor(source.name + "_RT", {
      bus1: `B_${source.name}.99`,
      bus2: `B_${source.name}.0`,
      R: source.resistance,
      X: 0,
      phases: 1,
    });
    study.add(reactor);
  });

  const allGeometries = transmissionLines
    .map((line) => line.towers.map((tower) => tower.geometry))
    .flat();
  const uniqueGeometries = [...new Set(allGeometries)];
  const LineSpacingClasses = uniqueGeometries.map((geometryId) => {
    const lineSpacing = findGeometry(geometryId);

    const lineSpacingClass = new LineSpacing({
      name: lineSpacing.name,
      nConds: lineSpacing.locations.length,
      nPhases: lineSpacing.locations.length,
      x: lineSpacing.locations.map((conductor) => conductor.x),
      h: lineSpacing.locations.map((conductor) => conductor.y),
      units: "m",
    });
    study.add(lineSpacingClass);
    return lineSpacingClass;
  });

  const allWireDataTypes = transmissionLines
    .map((line) => line.conductors.map((conductor) => conductor.type))
    .flat();
  const uniqueWireDataTypes = [...new Set(allWireDataTypes)];
  const wireDataClasses = uniqueWireDataTypes.map((typeId) => {
    const wireData = findConductor(typeId);

    const wireDataClass = new WireData(wireData.name, {
      diam: wireData.diameter_conductor,
      gmrac: wireData.gmr,
      rac: wireData.ac_resistance_75,
      radUnits: "mm",
      gmrUnits: "mm",
      rUnits: "km",
    });
    study.add(wireDataClass);
    return wireDataClass;
  });

  transmissionLines.forEach((line) => {
    const wires = line.conductors.map((conductorInput) => {
      const conductorClass = findConductor(conductorInput.type);
      return conductorClass.name;
    });
    const allGeometryIds = line.towers.map((tower) => tower.geometry);
    const uniqueGeometries = [...new Set(allGeometryIds)];
    const geometryClasses = uniqueGeometries.map((geometryId) => {
      const geometry = findGeometry(geometryId);
      const geometryClass = new LineGeometry(`${line.name}_${geometry.name}`, {
        nconds: line.conductors.length,
        nphases: line.conductors.length,
        spacing: geometry.name,
        reduce: false,
        wires,
      });
      study.add(geometryClass);
      return geometryClass;
    });

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
    const neutralBus1Phases = intermediatePhases.slice(-numNeutrals).join(".");
    const neutralBus2Phases = new Array(numNeutrals).fill(0).join(".");

    line.towers.forEach((tower, index) => {
      const name = `${line.name}_${tower.name}`;
      const geometry = findGeometry(tower.geometry);
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
        const reactorClass = new Reactor(name + "_RT", {
          bus1: `${name}.${neutralBus1Phases}`,
          bus2: `${name}.${neutralBus2Phases}`,
          R: tower.resistance,
          X: 0,
          phases: numNeutrals,
        });
        study.add(lineClass);
        study.add(reactorClass);
      } else {
        const prevName = `${line.name}_` + line.towers[index - 1].name;
        const lineClass = new Line(`${line.name}_S${towerNumber}`, {
          bus1: `${prevName}.${middlePhases}`,
          bus2: `${name}.${middlePhases}`,
          length: tower.distance,
          phases: numConductors,
          units: "km",
          geometry: `${line.name}_${geometry.name}`,
        });

        const reactorClass = new Reactor(name + "_RT", {
          bus1: `${name}.${neutralBus1Phases}`,
          bus2: `${name}.${neutralBus2Phases}`,
          R: tower.resistance,
          X: 0,
          phases: numNeutrals,
        });
        study.add(lineClass);
        study.add(reactorClass);

        if (towerNumber === line.towers.length) {
          const lineClass = new Line(`${line.name}_S${towerNumber + 1}`, {
            bus1: `${name}.${middlePhases}`,
            bus2: `B_${toSource.name}.${finalPhases}`,
            length: tower.distance, // FIXME: Final Distance to Tower
            phases: numConductors,
            units: "km",
            geometry: `${line.name}_${geometry.name}`,
          });
          study.add(lineClass);
        }
      }
    });
  });
  const fault = new Fault("SHORT_CIRCUIT", {
    bus1: `B_${circuit.name}.1`,
    bus2: `B_${circuit.name}.99`,
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
  const current1 = study.readCurrent(reactor, 1);
  results.push([circuit.name, current1]);
  sources.slice(1).forEach((source) => {
    study.changeParameter(fault, "bus1", `B_${source.name}.1`);
    study.changeParameter(fault, "bus2", `B_${source.name}.99`);
    study.solve();
    const current1 = study.driver.readCurrent(`Reactor.${source.name}_RT`, 1);
    results.push([source.name, current1]);
  });

  // TRANSMISSION LINES
  study.changeParameter(fault, "phases", "2");
  transmissionLines.forEach((line) => {
    line.towers.forEach((tower) => {
      study.changeParameter(fault, "bus1", `${line.name}_${tower.name}.1`);
      study.changeParameter(fault, "bus2", `${line.name}_${tower.name}.7`);
      study.solve();

      const current1 = study.driver.readCurrent(
        `Reactor.${line.name}_${tower.name}_RT`,
        1
      );
      results.push([tower.name, current1]);
    });
  });
  return results;
}
