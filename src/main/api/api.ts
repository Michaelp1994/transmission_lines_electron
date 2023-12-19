// eslint-disable-next-line import/no-extraneous-dependencies
import { dialog, ipcMain, BrowserWindow } from "electron";
import ConductorType from "@models/ConductorType.model";
import fs from "fs/promises";
import TowerGeometry from "@database/models/TowerGeometry.model";
import ApiEvent from "@shared/ApiEvent";

import { buildCircuit, solveFault } from "@api/buildScript";

interface Project {
    sources: Source[];
    transmissionLines: TransmissionLine[];
}

export default function setupApi() {
    ipcMain.handle(ApiEvent.SolveCircuit, async (_, project: Project) => {
        const {
            study,
            circuitObjects,
            sourceObjects,
            transmissionLineObjects,
        } = await buildCircuit(project);
        const results = await solveFault(
            study,
            circuitObjects,
            sourceObjects,
            transmissionLineObjects
        );
        return results;
    });

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
        async (_, { id, conductorType: newConductorType }) => {
            const conductorType = await ConductorType.findOne({
                where: { id },
            });
            if (!conductorType) {
                throw new Error("Conductor type not found");
            }
            Object.assign(conductorType, newConductorType);
            await conductorType.save();
        }
    );

    ipcMain.handle(
        ApiEvent.EditTowerGeometry,
        async (_, { id, towerGeometry: newTowerGeometry }) => {
            const towerGeometry = await TowerGeometry.findOne({
                where: { id },
            });
            if (!towerGeometry) {
                throw new Error("Tower geometry not found");
            }
            Object.assign(towerGeometry, newTowerGeometry);
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

    ipcMain.handle(ApiEvent.OpenProject, async () => {
        const currentBrowser = BrowserWindow.getFocusedWindow();
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const openDialogReturn = await dialog.showOpenDialog(currentBrowser, {
            properties: ["openFile"],
            filters: [
                { name: "Project", extensions: ["study"] },
                { name: "All Files", extensions: ["*"] },
            ],
        });
        if (!openDialogReturn.canceled) {
            const fileName = openDialogReturn.filePaths[0];
            const file = await fs.readFile(fileName);
            const contents = JSON.parse(file.toString());
            return contents;
        }
        return null;
    });
    ipcMain.handle(
        ApiEvent.SaveProject,
        async (_, sources: Source[], transmissionLines: TransmissionLine[]) => {
            const currentBrowser = BrowserWindow.getFocusedWindow();
            if (!currentBrowser) {
                throw new Error("No browser window found");
            }
            const saveDialogReturn = await dialog.showSaveDialog(
                currentBrowser,
                {
                    filters: [
                        { name: "Project", extensions: ["study"] },
                        { name: "All Files", extensions: ["*"] },
                    ],
                }
            );
            if (!saveDialogReturn.canceled) {
                const fileName = saveDialogReturn.filePath!;
                await fs.writeFile(
                    fileName,
                    JSON.stringify({ sources, transmissionLines })
                );
                return true;
            }
            return null;
        }
    );
}
