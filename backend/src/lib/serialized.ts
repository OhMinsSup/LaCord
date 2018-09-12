import { pick } from 'lodash';

export const serializePost = (data: any) => {
    const {
        id,
        title,
        body,
        post_thumbnail,
        created_at,
        user
    } = data;
    const tags = data.tags.map(tag => tag.name);
    return {
        id,
        post_thumbnail,
        title,
        body,
        created_at,
        tags,
        user: {
            ...pick(user, ['id', 'username', 'email', 'thumbnail']),
        }
    }
}
