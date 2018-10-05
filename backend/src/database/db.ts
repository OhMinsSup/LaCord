import { createConnection, Connection } from 'typeorm';
import  * as pg from 'pg';
import "reflect-metadata";
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../config/config';

(pg as any).defaults.parseInt8 = true; // fixes issue: umbers returning as string.

class Database {
    public connection: Connection | null = null;

    public get connected () {
        if (!this.connection) return false;
        return this.connection
    }

    public connect() {
        const db = createConnection({
            type: "postgres",
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATA_BASE,
            entities: [
                __dirname + "/entity/*"
            ],
            // dropSchema 및 synchronize는 개발용에서만
            dropSchema: true,
            synchronize: true
        })
        .then(c => {
            this.connection = c;
            console.log('LaCord Database Conntection ✅')
        })
        .catch(e => {
            this.connection = null;
            console.error('database connected error:' + e);
        });

        return db;
    }
}

const database = new Database();

export default database;