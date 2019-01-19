import { Middleware, Context } from 'koa';
import * as fs from 'fs';

export const convertFile: Middleware = async (ctx: Context) => {
  type BodySchema = {};

  const {
    files: { file },
    body,
  } = ctx.request;

  const {  }: BodySchema = body;

  try {
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
