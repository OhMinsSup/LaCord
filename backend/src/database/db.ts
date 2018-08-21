import { createConnection, Connection } from 'typeorm';
import  * as pg from 'pg';
import "reflect-metadata";
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../config/config';

(pg as any).defaults.parseInt8 = true; // fixes issue: umbers returning as string.

let connection: Connection;

const connect = async () => {
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
        // dropSchema 및 synchronize는 개발용에서만
        dropSchema: true,
        synchronize: true
    })
    .then((c) => {
        connection = c;
        console.log('Typeorm => LaCord DB connetion ✅');
    })
    .catch(e => {
        console.error(e);
    })
}

const disconnect = async () => {
    return connection.close();
}

export {
    connect,
    disconnect
};
