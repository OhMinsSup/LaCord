import server from '../src/index';
import * as requset from 'supertest';

describe('Index Route', () => {
    it('Routing Test', async () => {
        jest.useFakeTimers();
        const res = await requset(server).get('/');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toEqual({
            payload: 'Hello Jest'
        });
        expect(res.body).toMatchSnapshot();
    })
});