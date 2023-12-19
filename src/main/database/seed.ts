import "reflect-metadata";
import ConductorType from "@models/ConductorType.model";
import TowerGeometry from "@models/TowerGeometry.model";
import ConductorTypes from "@shared/conductorTypes.json";
import TowerGeometries from "@shared/geometries.json";
import dataSource from "@database/dataSource";

async function seedDb() {
    if (!dataSource.isInitialized) await dataSource.initialize();

    // eslint-disable-next-line no-restricted-syntax
    for await (const conductorType of ConductorTypes) {
        const newConductorType = new ConductorType();
        Object.assign(newConductorType, conductorType);
        await newConductorType.save();
    }
    // eslint-disable-next-line no-restricted-syntax
    for await (const geometry of TowerGeometries) {
        const newGeometry = new TowerGeometry();
        Object.assign(newGeometry, geometry);
        await newGeometry.save();
    }
    return true;
}

export default seedDb;
