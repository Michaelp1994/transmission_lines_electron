type Id = number;

type Project = {
  id: Id;
  sources: Source[];
  transmissionLines: TransmissionLine[];
};

type Source = {
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

type TransmissionLine = {
  id: Id;
  name: string;
  phases: number;
  distance: number;
  from: Source;
  to: Source;
  numTowers: number;
  towerResistance: number;
  defaultGeometry: Geometry;
  towers: Tower[];
};

type Tower = {
  id: Id;
  resistance: number;
  geometry: Geometry;
  conductors: Conductor[];
};

type Geometry = {
  id: Id;
  nphases: number;
  name: string;
  locations: ConductorLocation[];
};

type ConductorLocation = {
  id: Id;
  x: number;
  y: number;
};

type Conductor = {
  id: Id;
  type: ConductorType;
  location: ConductorLocation;
  phase: number;
  bundleNumber: number;
  bundleSpacing: number;
};

type ConductorType = {
  id: Id;
  name: string;
  awg: number;
  kcmil: number;
  aluminium_mm2: number;
  stranding: string;
  diameter_conductor: number;
  diameter_core: number;
  layers: number;
  cca: number;
  dc_resistance_25: number;
  ac_resistance_25: number;
  ac_resistance_50: number;
  ac_resistance_75: number;
  gmr: number;
  xl: number;
  xc: number;
};

// WORKING
interface SourceInput {
  name: string;
  phases: number;
  voltage: number;
  Isc1: number;
  Isc3: number;
  x0r0: number;
  x1r1: number;
  frequency: number;
  resistance: number;
}

interface TransmissionLineInput {
  name: string;
  phases: number;
  fromSource: number;
  toSource: number;
  conductors: ConductorInput[];
  towers: TransmissionTowerInput[];
}

interface ConductorInput {
  name: string;
  fromPhase: number;
  toPhase: number;
  bundleNumber: number;
  bundleSpacing?: number;
  type: number;
}

interface TransmissionTowerInput {
  name: string;
  resistance: number;
  distance: number;
  geometry: number;
}
