import * as request from 'supertest';
import server from '../src/server';

describe('LaCord Server is live', () => {
    test('server respones', async () => {
        const response = await request(server.callback()).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("test");
    })
})
