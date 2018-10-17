import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Lecture from './Lecture';

@Entity('category')
class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
  })
  public name: string;

  @OneToMany(type => Lecture, lecture => lecture.category, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public category_lecture: Lecture[];
}

export default Category;
