import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { hash } from '../../lib/common';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

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

    public validatePassword(password: string) {
        const hashed: string = hash(password);
        return this.password === hashed;
    }
}

export default User;