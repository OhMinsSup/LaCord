import * as crypto from 'crypto';
import { Context } from 'koa';
import * as joi from 'joi';
import removeMd from 'remove-markdown';
import { getRepository } from 'typeorm';
import Post from '../database/entity/Post';

/**
 * @description 비밀번호를 해시값으로 변환하는 함수
 * @param {string} password
 * @returns {string} password(hash값)
 */
export const hash = (password: string): string => {
  return crypto
    .createHmac('sha256', 'lacord$key$vlaue')
    .update(password)
    .digest('hex');
};

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
  next: () => Promise<any>
): Promise<any> => {
  const { id } = ctx.params;
  const postRepository = await getRepository(Post);

  try {
    const post = await postRepository.findOne({
      where: {
        id,
      },
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

/**
 * @description UUID 값을 JOI로 체크
 * @param {string} name
 * @returns {boolean}
 */
export const isUUID = (name: string) => {
  console.log(name);
  const validation = joi.validate(name, joi.string().uuid());
  if (validation.error) return false;
  return true;
};

/**
 * @description 마크다운 또는 일반 텍스트문자를 제거하고 글자수가 200자 이상이면  나머지 문자를 생략하고 ...으로 교체
 * @param {string, string} markdown, type
 * @returns {string}
 */
export function formatShortDescription(
  value: string,
  type: 'markdown' | 'text'
): string {
  let replaced = '';
  if (type === 'markdown') {
    replaced = value.replace(/\n/g, ' ').replace(/```(.*)```/g, '');
    return (
      removeMd(replaced)
        .slice(0, 200)
        .replace(/#/g, '') + (replaced.length > 200 ? '...' : '')
    );
  } else {
    replaced = value.replace(/\n/g, ' ');
    return replaced.slice(0, 200) + (replaced.length > 200 ? '...' : '');
  }
}
