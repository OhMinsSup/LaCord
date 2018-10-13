import { Context, Middleware } from 'koa';
import * as Joi from 'joi';
import { getCustomRepository } from 'typeorm';
import CommentRepository from '../../../database/repository/CommentRepository';
import { serializeComment } from '../../../lib/serialized';

/**@return {Promise<any>}
 * @description 댓글을 작성하기 위한 api
 * @param {Context} ctx koa Context
 */
export const writeComment = async (ctx: Context): Promise<any> => {
  type BodySchema = {
    text: string;
  };

  const schema = Joi.object().keys({
    text: Joi.string()
      .min(1)
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const commentCustomRespository = await getCustomRepository(CommentRepository);

  const { text }: BodySchema = ctx.request.body;
  const user = ctx['user'];
  const post = ctx['post'];

  try {
    const comment = await commentCustomRespository.writeComment(
      text,
      user,
      post
    );

    if (!comment) {
      ctx.status = 500;
      return;
    }

    const commentWithData = await commentCustomRespository.readComment(
      comment.id
    );

    ctx.body = serializeComment(commentWithData);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 댓글을 수정하기 위한 api
 * @param {Context} ctx koa Context
 */
export const updateComment: Middleware = async (ctx: Context): Promise<any> => {
  type BodySchema = {
    text: string;
  };

  const schema = Joi.object().keys({
    text: Joi.string()
      .min(1)
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const commentCustomRespository = await getCustomRepository(CommentRepository);

  const { text }: BodySchema = ctx.request.body;
  const { commentId } = ctx.params;

  try {
    await commentCustomRespository.updateComment(commentId, text);
    const commentWithData = await commentCustomRespository.readComment(
      commentId
    );
    ctx.body = serializeComment(commentWithData);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**@return {Promise<any>}
 * @description 댓글을 삭제하기 위한 api
 * @param {Context} ctx koa Context
 */
export const deleteComment: Middleware = async (ctx: Context): Promise<any> => {
  const { commentId } = ctx.params;

  const commentCustomRespository = await getCustomRepository(CommentRepository);

  try {
    await commentCustomRespository.deleteComment(commentId);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
