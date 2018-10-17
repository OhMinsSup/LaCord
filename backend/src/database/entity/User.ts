import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { hash } from '../../lib/common';
import Post from './Post';
import Like from './Like';
import Comment from './Comment';
import Lecture from './Lecture';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({
    type: 'varchar',
    unique: true,
  })
  public username: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public thumbnail: string | null;

  @Index()
  @Column({
    type: 'varchar',
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
  })
  public password: string;

  @CreateDateColumn()
  public created_at: string;

  @CreateDateColumn()
  public updated_at: string;

  @OneToMany(type => Post, post => post.user, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public posts: Post[];

  @OneToMany(type => Lecture, lecture => lecture.user, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public lectures: Lecture[];

  @OneToMany(type => Comment, comment => comment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public comments: Comment[];

  @OneToMany(type => Like, like => like.user, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public user_likes: Like[];

  public validatePassword(password: string) {
    const hashed: string = hash(password);
    return this.password === hashed;
  }
}

export default User;
