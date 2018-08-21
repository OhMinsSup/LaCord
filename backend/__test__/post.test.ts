import { createConnection, Connection } from 'typeorm';
import * as request from  'supertest';
import server from '../src/server';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATA_BASE } from '../src/config/config';
import Post from '../src/database/entity/Post';

const title = 'title';
const body = 'body';
const post_thumbnail = 'https://images.velog.io/thumbnails/velopert/0fe0e5e0-933f-11e8-9da6-398b11656879-17202261.png';

describe( 'Post API', () => {
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
                Post
            ],
            synchronize: true
        });
    });

    afterEach(async () => {
        connection.close();
    });

    it('Write API', async () => {
        console.log('test');
    })
})