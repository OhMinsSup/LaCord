import * as request from 'supertest';
import server from '../src/server';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../src/config/config';
import User from '../src/database/entity/User';
import Post from '../src/database/entity/Post';
import Tag from '../src/database/entity/Tag';
import Like from '../src/database/entity/Like';

describe('LaCord Testing', () => {
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
                Tag,
                Like
            ],
        })
        .then((c) => {
            connection = c;
        })
        .catch(e => {
            console.error(e);
        })
    });

    afterEach(async () => {
        await connection.close();
    });

    test('server respones', async () => {
        const response = await request(server.callback()).get('/');
        expect(response.status).toBe(200);        
        expect(response.body).toEqual({
            payload: 'Hello jest'
        });
        expect(response.body).toMatchSnapshot();
    });    
});