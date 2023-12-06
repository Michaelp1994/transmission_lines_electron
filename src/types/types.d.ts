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
