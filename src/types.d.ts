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
