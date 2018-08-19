import { Context } from 'koa';

/**
 * @description CORS 설정 미들웨어
 * @param {Context} ctx
 * @param {() => Promise<any>} next
 * @returns {() => Promise<any>} next()
 */

export default (ctx: Context, next: () => Promise<any>) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:4000');
  if (ctx.headers.referer && ctx.headers.referer.indexOf('localhost:4000') > -1) {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:4000');
  }
  ctx.set('Access-Control-Allow-Credentials', true as any);
  return next();
};