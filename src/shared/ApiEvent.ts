enum ApiEvent {
    GetConductors = "get-conductor-types",
    GetGeometries = "get-tower-geometries",
    SingleTowerGeometry = "tower-geometry",
    SingleConductorType = "conductor-type",
    AddTowerGeometry = "add-tower-geometry",
    AddConductorType = "add-conductor-type",
    EditConductorType = "edit-conductor-type",
    EditTowerGeometry = "edit-tower-geometry",
    SolveCircuit = "solve-circuit",
    OpenProject = "open-project",
    SaveProject = "save-project",
    InvalidateCache = "invalidate-cache",
}

export default ApiEvent;
