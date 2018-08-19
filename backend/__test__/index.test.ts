import * as request from 'supertest';
import server from '../src/index';
import { db as connect, disconnect } from '../src/database/db';

describe('LaCord Server is live', () => {
    test('server respones', async () => {
        beforeAll(async () => {
            await connect();
        });

        afterAll (async () => {
            await disconnect();
        });

        const response = await request(server.callback()).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('test');
    })
})