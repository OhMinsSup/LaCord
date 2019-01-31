import { Middleware, Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import * as Joi from 'joi';

import UserRepository from '../../database/repository/UserRepository';
import { UserToken } from '../../types/types';
import { decode, generate } from '../../lib/token';

export const unregister: Middleware = async (ctx: Context) => {
  type BodySchema = {
    unregister_token: string;
  };
  const { username, id }: UserToken = ctx['user'];

  const schema = Joi.object().keys({
    unregister_token: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const { unregister_token }: BodySchema = ctx.request.body;
  const userCustomRespository = await getCustomRepository(UserRepository);
  try {
    const decoded = await decode(unregister_token);

    if (decoded['username'] !== username) {
      ctx.status = 400;
      return;
    }
    await userCustomRespository.unRegister(id);

    ctx.cookies.set('access_token', '');
    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const generateUnregisterToken: Middleware = async (ctx: Context) => {
  const { username }: UserToken = ctx['user'];

  try {
    const token = await generate(
      { username },
      {
        expiresIn: '1h',
        subject: 'unregister',
      }
    );

    ctx.body = {
      unregister_token: token,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getUserInfo: Middleware = async (ctx: Context) => {
  const { id }: UserToken = ctx['user'];

  const userCustomRespository = await getCustomRepository(UserRepository);

  try {
    const user = await userCustomRespository.findByUserId(id);
    if (!user) {
      ctx.status = 401;
      return;
    }

    ctx.body = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        thumbnail: user.thumbnail,
      },
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
