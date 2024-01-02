/* eslint-disable no-console */
import dataSource from "@database/dataSource";
import { MigrationExecutor } from "typeorm";

export default async function setupDatabase() {
    console.log("Setting up database...");
    await dataSource.initialize();
    console.log("Database initialized");
    const migrationExecutor = new MigrationExecutor(dataSource);
    // TODO: inform the user there are pending migrations and ask if they want to run them.
    const migrations = await migrationExecutor.getPendingMigrations();
    await migrationExecutor.executePendingMigrations();
    console.log(migrations);
}
