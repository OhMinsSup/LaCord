import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, OneToMany } from 'typeorm';
import { hash } from '../../lib/common';
import Post from './Post';
import Like from './Like';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Index()
    @Column({
        type: "varchar",
        unique: true,
    })
    public username: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    public thumbnail: string | null;

    @Index()
    @Column({
        type: "varchar",
        unique: true
    })
    public email: string;

    @Column({
        type: "varchar",
    })
    public password: string;

    @CreateDateColumn()
    public created_at: string;

    @CreateDateColumn()
    public updated_at: string;

    @OneToMany(type => Post, post => post.user)
    public posts: Post[];

    @OneToMany(type => Like, like => like.user)
    public user_likes: Like[];

    public validatePassword(password: string) {
        const hashed: string = hash(password);
        return this.password === hashed;
    }
}

export default User;