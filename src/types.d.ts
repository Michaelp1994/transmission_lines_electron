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

interface ConductorTypeInput {
    name: string;
    surfaceArea?: number;
    stranding?: string;
    outerDiameter?: number;
    coreDiameter?: number;
    layers?: number;
    currentCapacity?: number;
    dcResistance25?: number;
    acResistance25?: number;
    acResistance50?: number;
    acResistance75?: number;
    gmr?: number;
}

interface ConductorLocationsInput {
    x: number;
    y: number;
}

interface TowerGeometryInput {
    name: string;
    conductors: ConductorLocationsInput[];
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

interface TowerGeometry {
    id: number;
    name: string;
    conductors: ConductorLocationsInput[];
}

interface ConductorType {
    id: number;
    name: string;
    surfaceArea?: number;
    stranding?: string;
    outerDiameter?: number;
    coreDiameter?: number;
    layers?: number;
    currentCapacity?: number;
    dcResistance25?: number;
    acResistance25?: number;
    acResistance50?: number;
    acResistance75?: number;
    gmr?: number;
}
