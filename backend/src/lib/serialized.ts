import { pick } from 'lodash';

export const serializePost = (data: any) => {
    const {
        id,
        title,
        body,
        post_thumbnail,
        user
    } = data;
    return {
        id,
        title,
        body,
        post_thumbnail,
        user: {
            ...pick(user, ['id', 'username', 'email', 'thumbnail']),
        }
    }
}
