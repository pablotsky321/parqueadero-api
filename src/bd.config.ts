import {DataSource} from "typeorm";
import {RegistroParqueoEntity} from "./entidades/RegistroParqueo";
import {VehiculoEntity} from "./entidades/Vehiculo";
import {MigrationV1} from "./migraciones/migrationV1";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST || "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "parqueaderodb",
    synchronize: false,
    logging: true,
    entities: [VehiculoEntity,RegistroParqueoEntity],
    subscribers: [],
    migrations: [MigrationV1],
    migrationsRun:true
})