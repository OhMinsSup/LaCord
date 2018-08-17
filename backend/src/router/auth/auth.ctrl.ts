import { Context } from 'koa';

export const localRegister = async (ctx: Context): Promise<any> => {
    try {
        ctx.body = 'test';
    } catch (e) {
        ctx.throw(500, e);
    }
}