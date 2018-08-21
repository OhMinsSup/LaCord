import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import Calendar from './Calendar';
import User from './User';

@Entity('post')
class Post {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}

export default Post;