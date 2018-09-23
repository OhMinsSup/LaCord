import { EntityRepository, Repository } from 'typeorm';
import Like from '../entity/Like';
import Post from '../entity/Post';
import User from '../entity/User';

@EntityRepository(Like)
class LikeRepository extends Repository<Like> {
    public checkExists(userId: string, postId: string) {
        return this.findOne({
            where: {
                postId,
                userId
            }
        });
    }

    public like(post: Post, user: User) {
        const like = new Like();
        like.post = post;
        like.user = user;
        return this.manager.save(like);
    }
}

export default LikeRepository;