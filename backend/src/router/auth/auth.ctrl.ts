import { Context, Middleware } from 'koa';
import { getCustomRepository } from 'typeorm';
import User from '../../database/entity/User';
import * as Joi from 'joi';
import UserRepository from '../../database/repository/UserRepository';

/**@return {void}
 * @description 로컬 회원가입을 하기위한 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const localRegister: Middleware = async (ctx: Context): Promise<any> => {
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
    
    console.log(result);
    

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
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

/**@return {void}
 * @description 로컬 로그인을 하기위한 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const localLogin: Middleware = async (ctx: Context): Promise<any> => {
    type BodySchema = {
        email: string,
        password: string
    }

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    })

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    const { email, password }: BodySchema = ctx.request.body;
    const userCustomRespository = await getCustomRepository(UserRepository);

    try {
        const user = await userCustomRespository.findUser('email', email);

        if (!user || !user.validatePassword(password)) {
            ctx.status = 403;
            ctx.body = {
                name: 'ERROR EXIST',
                payload: !user ? '계정을 찾을 수 없습니다.' : '비밀 번호가 일치하지 않습니다.'
            };
            return;
        }

        const token = await userCustomRespository.generateToken(user.id);
        ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, })
        
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

/**@return {void}
 * @description 로그아웃을 하기위한 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const logout: Middleware = (ctx: Context) => {
    ctx.cookies.set('access_token', null, {maxAge: 0, httpOnly: true});
    ctx.status = 204;
}