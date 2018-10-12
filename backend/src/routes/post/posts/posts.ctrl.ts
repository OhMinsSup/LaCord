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
