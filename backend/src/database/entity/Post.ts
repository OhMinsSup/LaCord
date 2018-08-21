import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import User from './User';

@Entity('post')
class Post {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    public post_thumbnail: string;

    @Column({
        type: 'varchar',
    })
    public title: string;

    @Column({
        type: 'varchar',
    })
    public body: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    public userId: string;

    @OneToOne(type => User, {
        cascade: true
    })
    @JoinColumn({ name: 'userId' })
    public user: User;
}

export default Post;