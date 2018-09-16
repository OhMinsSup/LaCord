import * as request from 'supertest';
import server from '../src/server';
import { Connection, createConnection } from 'typeorm';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../src/config/config';

describe('LaCord Server is live', () => {
    let connection: Connection;

    beforeEach(async () => {
        connection = await createConnection({
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
        });
    });

    afterEach(async () => {
        await connection.close();
    });

    test('server respones', async () => {
        const response = await request(server.callback()).get('/');
        expect(response.status).toEqual(200);        
        expect(response.type).toEqual("application/json");
        expect(response.body).toEqual({
            "payload": "test"
        });
    });
});
