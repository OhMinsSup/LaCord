import { pick } from 'lodash';

/**
 * @description 포스트 데이터에서 필요한 데이터만 필터링
 * @param {any} Data(포스트의 속성과 유저 속성을 가져온다)
 * @returns {Object<any>} id, post_thumbnail, title, body, created_at, tags, user: { id, username, email, thumbnail }
 */
export const serializePost = (data: any) => {
  const {
    id,
    title,
    body,
    post_thumbnail,
    created_at,
    user,
    tags,
    liked,
    likes,
    comments,
  } = data;
  return {
    id,
    post_thumbnail,
    title,
    body,
    created_at,
    tags,
    liked,
    comments,
    likes,
    user: {
      ...pick(user, ['id', 'username', 'email', 'thumbnail']),
    },
  };
};
