import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import User from './User';
import Like from './Like';

@Entity('post')
class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public post_thumbnail: string | null;

  @Column({
    type: 'varchar',
  })
  public title: string;

  @Column({
    type: 'varchar',
  })
  public body: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public likes: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public comments: number;

  @Column('varchar', { array: true })
  public tags: string[];

  @CreateDateColumn()
  public created_at: string;

  @CreateDateColumn()
  public updated_at: string;

  @ManyToOne(type => User, user => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  public user: User;

  @OneToMany(type => Like, like => like.post, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public post_likes: Like[];

  public count() {
    return this.likes;
  }
}

export default Post;
