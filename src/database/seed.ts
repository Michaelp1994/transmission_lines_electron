import "reflect-metadata";
import ConductorType from "@models/ConductorType.model";
import TowerGeometry from "@models/TowerGeometry.model";
import ConductorTypes from "@shared/conductorTypes.json";
import TowerGeometries from "@shared/geometries.json";
import dataSource from "@database/dataSource";

async function seedDb() {
    dataSource.isInitialized || (await dataSource.initialize());
    for await (const conductorType of ConductorTypes) {
        const newConductorType = new ConductorType();
        Object.assign(newConductorType, conductorType);
        await newConductorType.save();
    }
    for await (const geometry of TowerGeometries) {
        const newGeometry = new TowerGeometry();
        Object.assign(newGeometry, geometry);
        await newGeometry.save();
    }
}

export default seedDb;
