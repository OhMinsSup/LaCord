import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import User from '../../database/entity/User';
import * as Joi from 'joi';
import UserRepository from '../../database/repository/UserRepository';

export const localRegister = async (ctx: Context): Promise<any> => {
    type BodySchema = {
        username: string,
        email: string,
        password: string
    }

    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    })

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
    }

    const { username, email, password }: BodySchema = ctx.request.body;
    const userCustomRespository = await getCustomRepository(UserRepository);
    
    try {
        
        const [emailExists, usernameExists] = await Promise.all([
            userCustomRespository.findUser('email', email),
            userCustomRespository.findUser('username', username)
        ])

        if (emailExists || usernameExists) {
            ctx.status = 409;
            ctx.body = {
                name: 'DUPLICATED_ACCOUNT',
                payload: emailExists ? 'email' : 'username'
            };
            return;
        }
    } catch (e) {
        ctx.throw(500, e);
    }


    try {
        const user = await userCustomRespository.localRegister(email, password, username);
        const token = await userCustomRespository.generateToken(user.id);
        
        ctx.cookies.set('access_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        ctx.body = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        };
    } catch (e) {
        ctx.throw(500, e);
    }
}