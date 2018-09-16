import * as request from 'supertest';
import server from '../../src/server';
import { Connection, createConnection } from 'typeorm';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../../src/config/config';

describe('LaCord Auth Router', () => {
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

    it('Register API', async () => {
        const response = await request(server.callback())
        .post('/auth/register/local')
        .send({
            username: 'test',
            password: '123123',
            email: 'test@test.com',
        });
        
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(['user','token'])
        );
    });
});