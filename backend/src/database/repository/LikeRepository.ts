import { EntityRepository, Repository } from 'typeorm';
import Like from '../entity/Like';

@EntityRepository(Like)
class LikeRepository extends Repository<Like> {
    public checkExists(userId: string, postId: string) {
        return this.findOne({
            where: {
                postId,
                userId
            }
        })
    }
}

export default LikeRepository;