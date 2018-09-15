import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/Post';
import Tag from '../entity/Tag';
import { tags } from 'joi';
import User from '../entity/User';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
    
    public writePost(title: string, body: string, post_thumbnail: string, user: User, tags: Tag[]) {
        const post = new Post();
        post.title = title;
        post.body = body;
        post.post_thumbnail = post_thumbnail;
        post.user = user;
        post.tags = tags;
        return this.manager.save(post);
    }

    public readPostById(id: string) {
        return this.createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.tags", "tag")
        .where("post.id=:value")
        .setParameter("value", id)
        .getOne();
    }
}

export default PostRepository;