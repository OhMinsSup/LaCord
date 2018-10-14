import { Context, Middleware } from 'koa';
import { getCustomRepository } from 'typeorm';
import * as Joi from 'joi';
import PostRepository from '../../database/repository/PostRepository';
import LikeRepository from '../../database/repository/LikeRepository';
import UserRepository from '../../database/repository/UserRepository';
import { serializePost } from '../../lib/serialized';
import { filterUnique } from '../../lib/common';

/**@return {Promise<any>}
 * @description 포스트를 작성하기 위한 api
 * @param {Context} ctx koa Context
 */
export const writePost: Middleware = async (ctx: Context): Promise<any> => {
  type BodySchema = {
    title: string;
    body: string;
    post_thumbnail?: string;
    tags?: string[];
  };

  const schema = Joi.object().keys({
    title: Joi.string()
      .required()
      .min(1)
      .max(120),
    body: Joi.string()
      .required()
      .min(1),
    post_thumbnail: Joi.string()
      .uri()
      .allow(null),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const postCustomRespository = await getCustomRepository(PostRepository);

  const { title, body, post_thumbnail, tags }: BodySchema = ctx.request.body;
  const user = ctx['user'];

  // 중복태그 제거
  const uniqueTags: string[] = filterUnique(tags);

  try {
    const post = await postCustomRespository.writePost(
      title,
      body,
      post_thumbnail,
      user,
      uniqueTags
    );
    const postData = await postCustomRespository.readPostById(post.id);
    // 필요한 데이터만 가져온다.
    ctx.body = serializePost(postData);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 포스트를 업데이트하기 위한 api
 * @param {Context} ctx koa Context
 */
export const updatePost: Middleware = async (ctx: Context): Promise<any> => {
  type BodySchema = {
    title: string;
    body: string;
    post_thumbnail?: string;
    tags?: string[];
  };

  const schema = Joi.object().keys({
    title: Joi.string()
      .required()
      .min(1)
      .max(120),
    body: Joi.string()
      .required()
      .min(1),
    post_thumbnail: Joi.string()
      .uri()
      .allow(null),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const postCustomRespository = await getCustomRepository(PostRepository);

  const { title, body, post_thumbnail, tags }: BodySchema = ctx.request.body;
  const uniqueTags: string[] = filterUnique(tags);
  const postId: string = ctx['post'].id;

  try {
    await postCustomRespository.updatePost(
      title,
      body,
      post_thumbnail,
      uniqueTags,
      postId
    );
    const post = await postCustomRespository.readPostById(postId);
    ctx.body = serializePost(post);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 포스트를 삭제하기 위한 api
 * @param {Context} ctx koa Context
 */
export const deletePost: Middleware = async (ctx: Context): Promise<any> => {
  const postId: string = ctx['post'].id;

  const postCustomRespository = await getCustomRepository(PostRepository);
  const likeCustomRespository = await getCustomRepository(LikeRepository);

  try {
    await Promise.all([likeCustomRespository.deleteLike(postId)]);
    await postCustomRespository.deletePost(postId);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 포스트를 읽기 위한 api
 * @param {Context} ctx koa Context
 */
export const readPost: Middleware = async (ctx: Context): Promise<any> => {
  const { username, id } = ctx.params;

  const postCustomRespository = await getCustomRepository(PostRepository);
  const userCustomRespository = await getCustomRepository(UserRepository);
  const likeCustomRespository = await getCustomRepository(LikeRepository);

  try {
    let post = await postCustomRespository.readPost(username, id);

    if (!post) {
      const user = await userCustomRespository.findUser('username', username);

      if (!user) {
        ctx.status = 404;
        return;
      }
    }

    post = await postCustomRespository.readPostById(post.id);

    if (!post) {
      ctx.status = 404;
      return;
    }

    let liked = false;
    if (ctx['user']) {
      const exists = await likeCustomRespository.checkExists(
        ctx['user'].id,
        post.id
      );
      liked = !!exists;
    }
    ctx.body = serializePost({
      ...post,
      liked,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
