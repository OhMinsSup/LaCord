import { createConnection, Connection } from 'typeorm';
import * as request from 'supertest';
import server from '../src/server';
import User from '../src/database/entity/User';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../src/config/config';

const username = "test";
const email = "test@test.com";
const password = "123123";

describe('Auth API', () => {
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
                User
            ],
            synchronize: true
        });
    });

    afterEach(async () => {
        connection.close();
    });

    it('Register API', async () => {
        const response = await request(server.callback())
        .post('/auth/register/local')
        .send({ 
            username: username, 
            password: password, 
            email: email 
        })
        .expect(200)

        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(["user","token"])
        )
    });

    it('Login API', async () => {
        const response = await request(server.callback())
        .post('/auth/login/local')
        .send({
            email: email,
            password: password
        })
        .expect(200)

        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(["user","token"])
        );
    });

    it('Check API', async () => {
        const response = await request(server.callback())
        .get('/auth/check');

        if (response.status === 403) {
            expect(response.status).toEqual(403);
            expect(response.type).toEqual("application/json");
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(["name","payload"])
            );
        } else if (response.status === 200) {
            expect(response.status).toEqual(200);
            expect(response.type).toEqual("application/json");
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(["user"])
            );
        }
    })

    it('Logout API', async () => {
        const response = await request(server.callback())
        .post('/auth/logout')
        .expect(204);
        
        expect(response.status).toEqual(204);
    })
})

// npm test -- -u