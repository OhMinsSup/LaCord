import { Middleware, Context } from 'koa';

export const convert: Middleware = (ctx: Context) => {
  ctx.body = 'sdsd';
};
