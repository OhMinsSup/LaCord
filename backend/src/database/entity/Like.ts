import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Post from './Post';
import User from './User';

@Entity('like')
class Like {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(type => Post, post => post.post_likes, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public post: Post;

  @ManyToOne(type => User, user => user.user_likes, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public user: User;
}

export default Like;
