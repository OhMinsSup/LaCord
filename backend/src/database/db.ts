import { createConnection } from 'typeorm';
import "reflect-metadata";
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../config/config';

const db =  createConnection({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATA_BASE,
    entities: [
        'dist/src/database/entity/**/*.js'
    ],
    synchronize: true
})

export default db;