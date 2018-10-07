import server from '../../src/server';
import * as request from 'supertest';
import "reflect-metadata";

describe('Auth Routes', () => {
    jest.useFakeTimers();
    describe('POST: /auth/register/local', () => {
        it('200 Register', async (done) => {
            try {
                const res = await request(server.callback())
                .post('/auth/register/local')
                .send({
                    username: 'test',
                    email: 'test@naver.com',
                    password: '123123'
                });
    
                expect(res.status).toEqual(200);
                expect(Object.keys(res.body.user)).toEqual(
                    expect.arrayContaining(['id','username','email','thumbnail'])
                );
                expect(res.body).toMatchSnapshot();
            } catch (e) {
                done(e)
            }
        });

        it('404 Validate Error', async (done) => {
            try {
                const res = await request(server.callback())
                .post('/auth/register/local')
                .send({
                    username: 123123,
                    email: 'test@naver.com',
                    password: '123123'
                });

                expect(res.status).toEqual(404);
                expect(res.body).toMatchSnapshot();
            } catch (e) {
                done(e);
            }
        });

        it('409 Duplicated_Account', async (done) => {
            try {
                const res = await request(server.callback())
                .post('/auth/register/local')
                .send({
                    username: 'test',
                    email: 'test@naver.com',
                    password: '123123'
                });

                expect(res.status).toEqual(409);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.stringMatching('DUPLICATED_ACCOUNT'),
                        payload: expect.any(String)
                    })
                );
                expect(res.body).toMatchSnapshot();
            } catch (e) {
                done(e);
            }
        })
    })
});