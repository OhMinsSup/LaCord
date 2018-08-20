import * as request from 'supertest';
import server from '../src/server';
import { getCustomRepository } from 'typeorm';
import { connect, disconnect } from '../src/database/db';
import User from '../src/database/entity/User';
import { hash } from '../src/lib/common';
import UserRepository from '../src/database/repository/UserRepository';

describe('LaCord Server is live', () => {
    test('server respones', async () => {
        const response = await request(server.callback()).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toMatchSnapshot();
    })
})

const username = "test";
const email = "test@test.com";
const password = "123123";

describe('Auth API', () => {
    beforeEach(async () => {
        this.connection = await connect();
    });

    afterEach(async () => {
        this.connection = await disconnect();
    });

    test('Local Register API', async () => {
        const userCustomRepository = await getCustomRepository(UserRepository);
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash(password);

        await userCustomRepository.save(user);

        await request(server.callback()).post('/auth/register/local').expect(200);
        
    })
})