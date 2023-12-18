import ConductorType from "@models/ConductorType.model";
import buildScript from "./buildScript";
import { ipcMain } from "electron";
import TowerGeometry from "@database/models/TowerGeometry.model";
import { ApiEvent } from "./api";

export function setupApi() {
    ipcMain.handle(
        ApiEvent.SolveCircuit,
        async (_, sources, transmissionLines) => {
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

    ipcMain.handle(ApiEvent.AddTowerGeometry, async (_, geometry) => {
        const newGeometry = TowerGeometry.create(geometry);
        await newGeometry.save();
    });

    ipcMain.handle(ApiEvent.AddConductorType, async (_, conductor) => {
        const newConductorType = ConductorType.create(conductor);
        await newConductorType.save();
    });

    ipcMain.handle(
        ApiEvent.EditConductorType,
        async (_, id: number, newConductor) => {
            const conductorType = await ConductorType.findOne({
                where: { id },
            });
            if (!conductorType) {
                throw new Error("Conductor type not found");
            }
            Object.assign(conductorType, newConductor);
            await conductorType.save();
        }
    );

    ipcMain.handle(
        ApiEvent.EditTowerGeometry,
        async (_, id: number, newGeometry) => {
            const towerGeometry = await TowerGeometry.findOne({
                where: { id },
            });
            if (!towerGeometry) {
                throw new Error("Tower geometry not found");
            }
            Object.assign(towerGeometry, newGeometry);
            await towerGeometry.save();
        }
    );

    ipcMain.handle(ApiEvent.SingleTowerGeometry, async (_, id: number) => {
        const geometry = await TowerGeometry.findOne({
            where: { id },
            relations: { conductors: true },
        });
        if (!geometry) {
            throw new Error("Geometry not found");
        }
        return geometry;
    });

    ipcMain.handle(ApiEvent.SingleConductorType, async (_, id: number) => {
        const conductorType = await ConductorType.findOne({ where: { id } });
        if (!conductorType) {
            throw new Error("Conductor type not found");
        }
        return conductorType;
    });
}
