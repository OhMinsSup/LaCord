import { Context } from 'koa';

export const readPostsList = async (ctx: Context): Promise<any> => {
    ctx.body = '테스트';
}