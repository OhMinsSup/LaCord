import { EntityRepository, Repository } from 'typeorm';
import Comment from '../entity/Comment';
import User from '../entity/User';
import Post from '../entity/Post';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  public writeComment(text: string, user: User, post: Post) {
    const comment = new Comment();
    comment.user = user;
    comment.post = post;
    comment.text = text;

    return this.manager.save(comment);
  }

  public async updateComment(commentId: string, text: string) {
    const data = await this.findOne({
      where: {
        id: commentId,
      },
    });

    if (!data) {
      throw 500;
    }

    return this.createQueryBuilder()
      .update(Comment)
      .set({
        text,
      })
      .where('id=:id', { id: data.id })
      .execute();
  }

  public async deleteComment(commentId: string) {
    const data = await this.findOne({
      where: {
        id: commentId,
      },
    });

    if (!data) {
      throw 500;
    }

    return this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment.id=:id', {
        id: data.id,
      })
      .execute();
  }

  public readComment(id: string) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id=:id', { id })
      .getOne();
  }
}

export default CommentRepository;
