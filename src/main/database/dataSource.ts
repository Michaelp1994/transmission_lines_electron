// import path from "path";
import { DataSource } from "typeorm";
import ConductorLocation from "./models/ConductorLocation.model";
import ConductorType from "./models/ConductorType.model";
import TowerGeometry from "./models/TowerGeometry.model";

export default new DataSource({
    type: "better-sqlite3",
    database: "./database.sqlite",
    synchronize: true,
    logging: ["error", "info"],
    entities: [ConductorLocation, ConductorType, TowerGeometry],
});
