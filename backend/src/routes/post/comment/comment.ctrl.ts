import { Context } from 'koa';

export const writeComment = async (ctx: Context): Promise<any> => {
    ctx.body = '하하'
}