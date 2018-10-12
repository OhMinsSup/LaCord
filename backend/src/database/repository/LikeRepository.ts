import { EntityRepository, Repository } from 'typeorm';
import Like from '../entity/Like';
import Post from '../entity/Post';
import User from '../entity/User';

@EntityRepository(Like)
class LikeRepository extends Repository<Like> {
  public checkExists(userId: string, postId: string) {
    return this.createQueryBuilder()
      .select('like')
      .from(Like, 'like')
      .where('like.user=:user', { user: userId })
      .andWhere('like.post=:post', { post: postId })
      .getOne();
  }

  public deleteLike(postId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Like)
      .where('post=:post', { post: postId })
      .execute();
  }

  public like(post: Post, user: User) {
    const like = new Like();
    like.post = post;
    like.user = user;
    return this.manager.save(like);
  }

  public unlike(post: string, user: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Like)
      .where('user =:user', { user })
      .andWhere('post =:post', { post })
      .execute();
  }
}

export default LikeRepository;
