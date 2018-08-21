import { Context } from 'koa';

/**
 * @description 로그인 체크
 * @param {Context} ctx
 * @param {() => Promise<any>} next
 * @returns {() => Promise<any>} next()
 */
export default (ctx: Context, next: () => Promise<any>) => {
    const user = ctx['user'];

    if (!user) {
        ctx.status = 409;
        return;
    }

    return next();
}