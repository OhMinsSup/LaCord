import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToMany, Index } from 'typeorm';
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
  
    @OneToOne(type => User, user => user.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    public user: User;

    @ManyToMany(type => Tag, tag => tag.posts)
    public tags: Tag | Tag[];
}

export default Post;