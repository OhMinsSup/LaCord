import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/Post';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
    public writePost(title: string, body: string, post_thumbnail: string, userId: string) {
        const post = new Post();
        post.title = title;
        post.body = body;
        post.post_thumbnail = post_thumbnail;
        post.userId = userId;

        return this.manager.save(post);
    }

    public readPostById(id: string) {
        return this.findOne({
            select: [
                'id',
                'title',
                'post_thumbnail',
                'userId',
                'user'
            ],
            relations: ['user'],
            where: {
                id
            }
        })
    }
}

export default PostRepository;