import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
        type: "varchar",
        unique: true
    })
    public email: string;

    @Column({
        type: "varchar",
    })
    public password: string;

    @CreateDateColumn()
    public created_at: number;

    @CreateDateColumn()
    public updated_at: number;
}

export default User;