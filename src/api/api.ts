import { ipcRenderer } from "electron";

export enum ApiEvent {
    GetConductors = "get-conductor-types",
    GetGeometries = "get-geometries",
    SingleTowerGeometry = "tower-geometry",
    SingleConductorType = "conductor-type",
    AddTowerGeometry = "add-tower-geometry",
    AddConductorType = "add-conductor-type",
    EditConductorType = "edit-conductor-type",
    EditTowerGeometry = "edit-tower-geometry",
    SolveCircuit = "solve-circuit",
}

export const api = {
    solveCircuit: (sources, transmissionLines) =>
        ipcRenderer.invoke(ApiEvent.SolveCircuit, sources, transmissionLines),
    getConductorTypes: () => ipcRenderer.invoke(ApiEvent.GetConductors),
    getGeometries: () => ipcRenderer.invoke(ApiEvent.GetGeometries),
    towerGeometry: (id: number) =>
        ipcRenderer.invoke(ApiEvent.SingleTowerGeometry, id),
    conductorType: (id: number) =>
        ipcRenderer.invoke(ApiEvent.SingleConductorType, id),
    addTowerGeometry: (towerGeometry: TowerGeometryInput) =>
        ipcRenderer.invoke(ApiEvent.AddTowerGeometry, towerGeometry),
    addConductorType: (conductorType: ConductorTypeInput) =>
        ipcRenderer.invoke(ApiEvent.AddConductorType, conductorType),
    editTowerGeometry: (id: number, towerGeometry: TowerGeometryInput) =>
        ipcRenderer.invoke(ApiEvent.EditTowerGeometry, id, towerGeometry),
    editConductorType: (id: number, conductorType: ConductorTypeInput) =>
        ipcRenderer.invoke(ApiEvent.EditConductorType, id, conductorType),
};

export type Api = typeof api;
