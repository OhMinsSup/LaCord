import * as crypto from 'crypto';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Post from '../database/entity/Post';

export const hash = (password: string): string => {
    return crypto.createHmac('sha256', 'lacord$key$vlaue').update(password).digest('hex');
}

export const filterUnique = (array: string[]): string[] => {
    return [...new Set(array)];
};

export const checkPostOwnership = async (ctx: Context, next: () => Promise<any>): Promise<any> => {
    const { id } = ctx.params;
    const PostRepository = await getRepository(Post);

    try {
        const post = await PostRepository.findOne({ 
            where: {
                id
            }
         });

         if (!post) {
            ctx.status = 404;
            return;
         }

         ctx['post'] = post;
    } catch (e) {
        ctx.throw(500, e);
        return;
    }
    return next();
}