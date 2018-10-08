import { EntityRepository, Repository } from 'typeorm';
import Post from '../entity/Post';
import User from '../entity/User';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
    public writePost(title: string, body: string, post_thumbnail: string, user: User, tags: string[]) {
        const post = new Post();
        post.title = title;
        post.body = body;
        post.post_thumbnail = post_thumbnail;
        post.user = user;
        post.tags = tags;
        return this.manager.save(post);
    }

    public updatePost(title: string, body: string, post_thumbnail: string, tags: string[], postId: string) {
        return this.createQueryBuilder()
        .update(Post)
        .set({ 
            title,
            body,
            post_thumbnail,
            tags    
        })
        .where("id=:id", { id: postId })
        .execute();
    }

    public deletePost(postId: string) {
        return this.createQueryBuilder()
        .delete()
        .from(Post)
        .where("id:=post", { post: postId })
        .execute();
    }

    public readPost (username: string, id: string) {
        return this.createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .where("post.id=:id")
        .setParameter("id", id)
        .where("post.user.username=:username")
        .setParameter("username", username)
        .getOne();
    }

    public readPostById(id: string) {
        return this.createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .where("post.id=:value")
        .setParameter("value", id)
        .getOne();
    }
}

export default PostRepository;