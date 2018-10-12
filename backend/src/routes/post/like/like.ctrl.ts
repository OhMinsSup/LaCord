import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import LikeRepository from '../../../database/repository/LikeRepository';
import PostRepository from '../../../database/repository/PostRepository';
import UserRepository from '../../../database/repository/UserRepository';
import Post from '../../../database/entity/Post';
import User from '../../../database/entity/User';

/**@return {Promise<any>}
 * @description 현재 like인지 unlike인지 체크하고 갯수 확인하는 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const getLike = async (ctx: Context): Promise<any> => {
  let liked = false;
  const { id } = ctx.params;
  const userId: string = ctx['user'].id;

  const likeCustomRespository = await getCustomRepository(LikeRepository);
  const postCustomRespository = await getCustomRepository(PostRepository);

  try {
    const post = await postCustomRespository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: '존재하지 않는 포스트',
      };
      return;
    }

    if (ctx['user']) {
      const exists = await likeCustomRespository.checkExists(userId, id);
      liked = !!exists;
    }

    ctx.body = {
      likes: post.likes,
      liked,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 포스트를 like하는 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const likePost = async (ctx: Context): Promise<any> => {
  const { id } = ctx.params;
  const userId: string = ctx['user'].id;

  let user: User = null;
  let post: Post = null;

  const likeCustomRespository = await getCustomRepository(LikeRepository);
  const postCustomRespository = await getCustomRepository(PostRepository);
  const userCustomRespository = await getCustomRepository(UserRepository);

  try {
    post = await postCustomRespository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: '존재하지 않는 포스트',
      };
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    user = await userCustomRespository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        name: '존재하지 않는 유저',
      };
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
    await postCustomRespository.manager.increment(
      Post,
      { id: post.id },
      'likes',
      1
    );

    ctx.body = {
      liked: true,
      likes: post.likes + 1,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 포스트를 unlike하는 api
 * @param {Context} ctx koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs
 */
export const unlikePost = async (ctx: Context): Promise<any> => {
  const { id } = ctx.params;
  const userId: string = ctx['user'].id;

  let user: User = null;
  let post: Post = null;

  const likeCustomRespository = await getCustomRepository(LikeRepository);
  const postCustomRespository = await getCustomRepository(PostRepository);
  const userCustomRespository = await getCustomRepository(UserRepository);

  try {
    post = await postCustomRespository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: '존재하지 않는 포스트',
      };
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    user = await userCustomRespository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        name: '존재하지 않는 유저',
      };
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    const exists = await likeCustomRespository.checkExists(user.id, post.id);

    if (!exists) {
      ctx.status = 409;
      ctx.body = {
        name: '좋아요 하지 않았습니다',
      };
      return;
    }

    await likeCustomRespository.unlike(post.id, user.id);
    await postCustomRespository.manager.decrement(
      Post,
      { id: post.id },
      'likes',
      1
    );

    ctx.body = {
      liked: false,
      likes: post.likes - 1,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
