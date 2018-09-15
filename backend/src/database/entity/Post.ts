import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import User from './User';
import Tag from './Tag';

@Entity('post')
class Post {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type: 'varchar',
        nullable: true
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
        default: 0
    })
    public likes: number;
  
    @ManyToOne(type => User, user => user.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn()
    public user: User;

    @ManyToMany(type => Tag, tag => tag.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
    })
    public tags: Tag[] | null;
}

export default Post;