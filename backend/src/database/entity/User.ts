import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { hash } from '../../lib/common';
import Letter from './Letter';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @Column({
    type: 'varchar',
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
  })
  public password: string;

  @OneToMany(type => Letter, letter => letter.user, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public letters: Letter[];

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
