/* eslint-disable no-console */
import dataSource from "@database/dataSource";
import { MigrationExecutor } from "typeorm";
import ApiEvent from "@shared/ApiEvent";

const migrationExecutor = new MigrationExecutor(dataSource);

export default {
    label: "Migrations",
    submenu: [
        {
            label: "Show Migrations",
            click: async () => {
                const pendingMigrations =
                    await migrationExecutor.getPendingMigrations();
                console.log("Pending Migrations:", pendingMigrations);
            },
        },
        {
            label: "Revert Last Migration",
            click: async (_menuItem, browserWindow) => {
                console.log("Reverting Last Migration");
                try {
                    await migrationExecutor.undoLastMigration();
                    if (browserWindow)
                        browserWindow.webContents.send(
                            ApiEvent.InvalidateCache
                        );
                } catch (error) {
                    console.log(error);
                }
            },
        },
        {
            label: "Execute Migration",
            click: async (_menuItem, browserWindow) => {
                const migrationsPerformed =
                    await migrationExecutor.executePendingMigrations();
                console.log("Migrations Performed: ", migrationsPerformed);
                // invalidate the cache
                if (browserWindow)
                    browserWindow.webContents.send(ApiEvent.InvalidateCache);
            },
        },
    ],
} as Electron.MenuItemConstructorOptions;
