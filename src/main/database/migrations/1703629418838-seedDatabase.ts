import { MigrationInterface, QueryRunner } from "typeorm";
import ConductorTypes from "@shared/conductorTypes.json";
import TowerGeometries from "@shared/geometries.json";
import ConductorType from "@models/ConductorType.model";
import TowerGeometry from "@models/TowerGeometry.model";
import ConductorLocation from "@database/models/ConductorLocation.model";

export class SeedDatabase1703629418838 implements MigrationInterface {
    name = "SeedDatabase1703629418838";
    public async up(queryRunner: QueryRunner): Promise<void> {
        const manager = queryRunner.manager;
        for await (const conductorType of ConductorTypes) {
            const newConductorType = manager.create(
                ConductorType,
                conductorType
            );
            await newConductorType.save();
        }
        for await (const geometry of TowerGeometries) {
            const newGeometry = manager.create(TowerGeometry, geometry);
            await newGeometry.save();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const manager = queryRunner.manager;
        await manager.clear(ConductorLocation);
        await manager.clear(ConductorType);
        await manager.clear(TowerGeometry);
    }
}
