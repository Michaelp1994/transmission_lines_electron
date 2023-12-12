import {
  ConductorType,
  FaultStudy,
  MainSubstation,
  Substation,
  TowerGeometry,
  TransmissionLine,
} from "opendss-fault-study";
import conductors from "./conductors.json";
import geometries from "./geometries.json";
import { LineGeometry } from "opendss-node-interface";

type SourceInput = {
  id: Id;
  name: string;
  phases: number;
  voltage: number;
  x1r1: number;
  isc1: number;
  isc3: number;
  x0r0: number;
  resistance: number;
};

type TransmissionLineInput = {
  name: string;
  phases: number;
  distance: number;
  from: number;
  to: number;
  numTowers: number;
  towerResistance: number;
  defaultGeometry: number;
  conductors: Conductor[];
  towers: Tower[];
};

type Conductor = {
  name: string;
  type: number;
  location: ConductorLocation;
  phase: number;
  bundleNumber: number;
  bundleSpacing: number;
};

type Tower = {
  name: string;
  resistance: number;
  geometry: number;
  distance: number;
};

export default async function buildCircuit(
  sources: SourceInput[],
  transmissionLines: TransmissionLineInput[]
) {
  const study = new FaultStudy("TEST_STUDY");
  const sourceClasses: Array<MainSubstation | Substation> = [];
  const transmissionLineClasses: Array<TransmissionLine> = [];
  const towerClasses: Array<TowerGeometry> = [];
  const ConductorTypeClasses: Array<ConductorType> = [];

  const primary = new MainSubstation(sources[0].name, {
    phases: sources[0].phases,
    voltage: sources[0].voltage,
    x1r1: sources[0].x1r1,
    Isc1: sources[0].isc1,
    Isc3: sources[0].isc3,
    x0r0: sources[0].x0r0,
    resistance: sources[0].resistance,
    frequency: 60,
  });

  study.addComponent(primary);
  sourceClasses.push(primary);

  sources.slice(1).forEach((source) => {
    const newSource = new MainSubstation(source.name, {
      phases: source.phases,
      voltage: source.voltage,
      x1r1: source.x1r1,
      Isc1: source.isc1,
      Isc3: source.isc3,
      x0r0: source.x0r0,
      resistance: source.resistance,
      frequency: 60,
    });
    study.addComponent(newSource);
    sourceClasses.push(newSource);
  });

  const conductorTypesUsed: Array<number> = [
    ...new Set(
      transmissionLines.flatMap((line) =>
        line.conductors.map((conductor) => conductor.type)
      )
    ),
  ];
  const geometryTypesUsed: Array<number> = [
    ...new Set(transmissionLines.map((line) => line.defaultGeometry)),
  ];

  conductorTypesUsed.forEach(async (conductorTypeId) => {
    const conductorType = new ConductorType(conductors[conductorTypeId].name, {
      outerDiameter: conductors[conductorTypeId].diameter_conductor,
      dcResistance25: conductors[conductorTypeId].dc_resistance_25,
      gmr: conductors[conductorTypeId].gmr,
    });
    ConductorTypeClasses.push(conductorType);
    study.addComponent(conductorType);
  });

  geometryTypesUsed.forEach(async (geometryTypeId) => {
    const geometry = new TowerGeometry(geometries[geometryTypeId].name, {
      conductors: geometries[geometryTypeId].locations,
    });
    towerClasses.push(geometry);
    study.addComponent(geometry);
  });

  transmissionLines.forEach((transmissionLine) => {
    const allConductors = transmissionLine.conductors.map((conductor) => ({
      name: conductor.name,
      type: ConductorTypeClasses.find(
        (conductorClass) =>
          conductorClass.name === conductors[conductor.type].name
      )!,
      location: conductor.location,
      phase: conductor.phase,
      bundleNumber: conductor.bundleNumber,
      bundleSpacing: conductor.bundleSpacing,
    }));

    const allTowers = transmissionLine.towers.map((tower) => ({
      name: tower.name,
      resistance: tower.resistance,
      geometry: towerClasses.find(
        (towerClass) => towerClass.name === geometries[tower.geometry].name
      )!,
      distance: tower.distance,
    }));

    const newTransmissionLine = new TransmissionLine(transmissionLine.name, {
      phases: transmissionLine.phases,
      distance: transmissionLine.distance,
      fromSource: sourceClasses[transmissionLine.from],
      toSource: sourceClasses[transmissionLine.to],
      numTowers: transmissionLine.numTowers,
      conductors: allConductors,
      towers: allTowers,
    });
    study.addComponent(newTransmissionLine);
    transmissionLineClasses.push(newTransmissionLine);
  });

  study.buildCircuit();
  study.solve();
}
