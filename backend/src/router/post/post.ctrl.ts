import { Context, Middleware } from 'koa';
import * as Joi from 'joi';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../../database/repository/PostRepository';
import TagRepository from '../../database/repository/TagRepository';
import { serializePost } from '../../lib/serialized';
import { filterUnique } from '../../lib/common';


/**@return {Promise<any>}
 * @description 포스트를 작성하기 위한 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const writePost: Middleware = async (ctx: Context): Promise<any> => {
    type BodySchema = {
        title: string,
        body: string,
        post_thumbnail?: string,
        tags?: string[]
    }

    const schema = Joi.object().keys({
        title: Joi.string().required().min(1).max(120),
        body: Joi.string().required().min(1),
        post_thumbnail: Joi.string().uri().allow(null),
        tags: Joi.array().items(Joi.string()),
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    // 각각 모델의 저장소를 만든다
    const postCustomRespository = await getCustomRepository(PostRepository);
    const tagCustomRespository = await getCustomRepository(TagRepository);
    
    const { title, body, post_thumbnail, tags }: BodySchema = ctx.request.body;
    const user = ctx['user'];
    
    // 중복태그 제거
    const uniqueTags: string[] = filterUnique(tags);
    
    ctx.body = uniqueTags;
    
    try {
        // 존재하는 태그면 태그를 찾아서 반환하고 만약 태그가 없으면 태그를 만들어서 반환
        const tags = await Promise.all(uniqueTags.map(tag => tagCustomRespository.getById(tag)));        
        const post = await postCustomRespository.writePost(title, body, post_thumbnail, user, tags);
        const postData = await postCustomRespository.readPostById(post.id);    
        // 필요한 데이터만 가져온다.    
        ctx.body = serializePost(postData);
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const updatePost = async (ctx: Context): Promise<any> => {
    ctx.body = 'dssd';
} 