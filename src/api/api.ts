import { ipcRenderer } from "electron";

export enum ApiEvent {
    GetConductors = "get-conductors",
    GetGeometries = "get-geometries",
    AddTowerGeometry = "add-tower-geometry",
    AddConductorType = "add-conductor-type",
    SolveCircuit = "solve-circuit",
}

export const api = {
    solveCircuit: (sources, transmissionLines) =>
        ipcRenderer.invoke(ApiEvent.SolveCircuit, sources, transmissionLines),
    getConductors: () => ipcRenderer.invoke(ApiEvent.GetConductors),
    getGeometries: () => ipcRenderer.invoke(ApiEvent.GetGeometries),
    addTowerGeometry: (towerGeometry: TowerGeometryInput) =>
        ipcRenderer.invoke(ApiEvent.AddTowerGeometry, towerGeometry),
    addConductorType: (conductorType: ConductorTypeInput) =>
        ipcRenderer.invoke(ApiEvent.AddConductorType, conductorType),
};

export type Api = typeof api;
