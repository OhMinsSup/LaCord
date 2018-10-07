import server from '../src/index';
import { Connection, createConnection } from 'typeorm';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../src/config/config';
import User from '../src/database/entity/User';
import Post from '../src/database/entity/Post';
import Like from '../src/database/entity/Like';
import 'reflect-metadata';

describe('Util', () => {
    jest.useFakeTimers();
    let connection: Connection;

    beforeEach(async () => {
        return createConnection({
            type: "postgres",
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATA_BASE,
            entities: [
                User,
                Post,
                Like
            ],
        }).then((c) => {
            connection = c;
        }).catch(e => {
            console.error(e);
        });
    });

    afterEach(async () => {
        await connection.close();
        await server.close();
    });
});