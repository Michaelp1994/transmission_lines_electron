import { ConductorType } from "@models/ConductorType.model";
import buildScript from "./buildScript";
import { ipcMain } from "electron";
import { TowerGeometry } from "@database/models/TowerGeometry.model";
import { ApiEvent } from "./api";

export function setupApi() {
    ipcMain.handle(
        ApiEvent.SolveCircuit,
        async (event, sources, transmissionLines) => {
            const results = await buildScript(sources, transmissionLines);
            return results;
        }
    );

    ipcMain.handle(ApiEvent.GetConductors, async () => {
        const allConductorTypes = await ConductorType.find();
        return allConductorTypes;
    });

    ipcMain.handle(ApiEvent.GetGeometries, async () => {
        const allGeometries = await TowerGeometry.find();
        return allGeometries;
    });

    ipcMain.handle(ApiEvent.AddTowerGeometry, async (event, geometry) => {
        const newGeometry = TowerGeometry.create(geometry);
        await newGeometry.save();
    });

    ipcMain.handle(ApiEvent.AddConductorType, async (event, conductor) => {
        const newConductorType = ConductorType.create(conductor);
        await newConductorType.save();
    });
}
