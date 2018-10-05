import * as crypto from 'crypto';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Post from '../database/entity/Post';

/**
 * @description 비밀번호를 해시값으로 변환하는 함수
 * @param {string} password
 * @returns {string} password(hash값)
 */
export const hash = (password: string): string => {
    return crypto.createHmac('sha256', 'lacord$key$vlaue').update(password).digest('hex');
}

/**
 * @description 중복된 데이터 없에는 함수
 * @param {string[]} array
 * @returns {string[]} array
 */
export const filterUnique = (array: string[]): string[] => {
    return [...new Set(array)];
};

/**
 * @description 포스트 체크
 * @param {Context, () => Promise<any>}}
 * @returns {() => Promise<any>}
 */
export const checkPostExistancy = async (
    ctx: Context,
    next: () => Promise<any>,
  ): Promise<any> => {
    const { id } = ctx.params;
    const postRepository = await getRepository(Post);

    try {
        const post = await postRepository.findOne({
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
};