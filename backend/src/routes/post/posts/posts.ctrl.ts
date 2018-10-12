import { Context, Middleware } from 'koa';
import { formatShortDescription } from '../../../lib/common';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../../../database/repository/PostRepository';
import { serializePost } from '../../../lib/serialized';

export const listPosts: Middleware = async (ctx: Context): Promise<any> => {
  const { username } = ctx.params;
  const { cursor } = ctx.query;

  const postCustomRespository = await getCustomRepository(PostRepository);

  try {
    const posts = await postCustomRespository.listPost(username, cursor);

    if (!posts.data) {
      ctx.body = [];
      return;
    }

    const nextId = posts.data.length === 10 ? posts.data[9].id : null;
    const serialized = posts.data.map(serializePost).map(post => ({
      ...post,
      body: formatShortDescription(post.body, 'text'),
    }));

    ctx.body = {
      nextId,
      serialized,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const listSequences: Middleware = async (ctx: Context): Promise<any> => {
  const { postId } = ctx.query;

  const postCustomRespository = await getCustomRepository(PostRepository);

  try {
    const post = await postCustomRespository.findById(postId);

    if (!post) {
      ctx.status = 404;
      return;
    }

    const {
      user: { id: userId },
      created_at,
    } = post;
    const promises = [];

    promises.push(
      postCustomRespository
        .createQueryBuilder('post')
        .where('post.user=:user', { user: userId })
        .andWhere('post.created_at >= :time', { time: created_at })
        .limit(4)
        .getMany()
    );

    promises.push(
      postCustomRespository
        .createQueryBuilder('post')
        .where('post.user=:user', { user: userId })
        .andWhere('post.created_at <= :time', { time: created_at })
        .limit(4)
        .getMany()
    );

    const [before, after] = await Promise.all(promises);
    delete post.user;

    const beforeCount = after.length < 2 ? 4 - after.length : 2;
    const afterCount = before.length < 2 ? 4 - before.length : 2;

    ctx.body = [
      ...before.slice(before.length - beforeCount, before.length),
      post,
      ...after.slice(0, afterCount),
    ].map(post => ({
      ...post,
      body: formatShortDescription(post.body, 'text'),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
