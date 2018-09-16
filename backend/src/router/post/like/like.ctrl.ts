import { Context } from 'koa';

export const likePost = async (ctx: Context): Promise<any> => {
    ctx.body = 'like';
};

export const unlikePost = async (ctx: Context): Promise<any> => {
    ctx.body = 'unlike';
};