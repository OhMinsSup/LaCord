import { createConnection } from 'typeorm';
import  * as pg from 'pg';
import "reflect-metadata";
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../config/config';

(pg as any).defaults.parseInt8 = true; // fixes issue: umbers returning as string.

const db = async () => {
    return await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATA_BASE,
        entities: [
            __dirname + "/entity/*.js"
        ],
        synchronize: true
    })
    .then((c) => {
        console.log('Typeorm => LaCord DB connetion ✅');
    })
    .catch(e => {
        console.log(e);
    })
}

export default db;