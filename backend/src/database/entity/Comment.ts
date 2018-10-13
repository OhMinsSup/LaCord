import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Post from './Post';
import User from './User';

@Entity('comment')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(type => Post, post => post.post_comments, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public post: Post;

  @ManyToOne(type => User, user => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public user: User;

  @Column({
    type: 'text',
  })
  public text: string;
}

export default Comment;
