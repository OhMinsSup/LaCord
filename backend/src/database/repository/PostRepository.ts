import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/Post';
import User from '../entity/User';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public writePost(
    title: string,
    body: string,
    post_thumbnail: string,
    user: User,
    tags: string[]
  ) {
    const post = new Post();
    post.title = title;
    post.body = body;
    post.post_thumbnail = post_thumbnail;
    post.user = user;
    post.tags = tags;
    return this.manager.save(post);
  }

  public updatePost(
    title: string,
    body: string,
    post_thumbnail: string,
    tags: string[],
    postId: string
  ) {
    return this.createQueryBuilder()
      .update(Post)
      .set({
        title,
        body,
        post_thumbnail,
        tags,
      })
      .where('id=:id', { id: postId })
      .execute();
  }

  public deletePost(postId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Post)
      .where('id:=post', { post: postId })
      .execute();
  }

  public readPost(username: string, id: string) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id=:id', { id })
      .andWhere('user.username=:username', { username })
      .getOne();
  }

  public readPostById(id: string) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id=:value')
      .setParameter('value', id)
      .getOne();
  }

  public async listPost(username?: string, cursor?: string) {
    let cursorData = null;

    if (cursor) {
      cursorData = await this.findOne({
        where: {
          id: cursor,
        },
      });

      if (!cursorData) {
        const e = new Error('Cusor data is not found');
        e.name = 'CURSOR_NOT_FOUND';
        throw e;
      }
    }

    const cursorDate = cursorData && cursorData.created_at;
    const time = cursorDate && new Date(cursorDate).toISOString();
    let rows: Post[] | null = null;

    try {
      if (cursor) {
        rows = await this.createQueryBuilder('post')
          .where(username ? 'user.username= :username' : '', { username })
          .andWhere('post.id != :cursor', { cursor })
          .andWhere('post.created_at >= :time', { time })
          .orderBy('post.created_at', 'DESC')
          .limit(10)
          .getMany();
      } else {
        rows = await this.createQueryBuilder('post')
          .leftJoinAndSelect('post.user', 'user')
          .where(username ? 'user.username= :username' : '', { username })
          .orderBy('post.created_at', 'DESC')
          .limit(10)
          .getMany();
      }

      if (rows.length === 0) return { data: null };

      return {
        data: rows,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default PostRepository;
