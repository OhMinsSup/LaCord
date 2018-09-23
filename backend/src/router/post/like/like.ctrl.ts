import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import LikeRepository from '../../../database/repository/LikeRepository';
import PostRepository from '../../../database/repository/PostRepository';
import UserRepository from '../../../database/repository/UserRepository';

export const likePost = async (ctx: Context): Promise<any> => {
    const { id } = ctx.params;
    const userId: string = ctx['user'].id;
    
    let user = null;
    let post = null;
    
    const likeCustomRespository = await getCustomRepository(LikeRepository);
    const postCustomRespository = await getCustomRepository(PostRepository);
    const userCustomRespository = await getCustomRepository(UserRepository);

    try {
        post = await postCustomRespository.findOne({ 
            where: {
                id
            }
        });
    
        if (!post) {
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 포스트'
            }
            return;
        }
    } catch (e) {
        ctx.throw(500, e);
    }

    try {
        user = await userCustomRespository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 유저'
            }
            return;
        }
    } catch (e) {
        ctx.throw(500, e);
    }

    try {        
        const exists = await likeCustomRespository.checkExists(user.id, post.id);
        
        if (exists) {
            ctx.status = 409;
            ctx.body = {
                name: '이미 좋아요 하였습니다.',
            };
            return;
        }

        await likeCustomRespository.like(post, user);
        await post.count();

        ctx.body = {
            liked: true,
            likes: (post.likes as number),
        };
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const unlikePost = async (ctx: Context): Promise<any> => {
    ctx.body = 'unlike';
};