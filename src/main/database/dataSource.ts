import path from "path";
import * as electron from "electron";
import { DataSource } from "typeorm";
import ConductorLocation from "./models/ConductorLocation.model";
import ConductorType from "./models/ConductorType.model";
import TowerGeometry from "./models/TowerGeometry.model";
import { InitialMigration1703610359462 } from "./migrations/1703610359462-initialMigration";
import { SeedDatabase1703629418838 } from "./migrations/1703629418838-seedDatabase";

const databasePath = electron.app.isPackaged
    ? path.join(electron.app.getPath("userData"), "database.sqlite")
    : "./database.sqlite";

export default new DataSource({
    type: "better-sqlite3",
    database: databasePath,
    // synchronize: true,
    logging: ["error", "info"],
    entities: [ConductorLocation, ConductorType, TowerGeometry],
    migrations: [InitialMigration1703610359462, SeedDatabase1703629418838],
});
