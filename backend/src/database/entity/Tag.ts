import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import Post from './Post';

@Entity('tag')
class Tag {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type: 'varchar',
    })
    public name: string;

    @ManyToMany(type => Post)
    @JoinTable({
        name: 'post_tag'
    })
    public posts: Post[];
}

export default Tag;
