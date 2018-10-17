import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';
import Category from './Category';
import Video from './Video';
import User from './User';

@Entity('lecture')
class Lecture {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
  })
  public title: string;

  @Column({
    type: 'text',
  })
  public description: string;

  @Column({
    type: 'int',
  })
  public score: number;

  @Column({
    type: 'enum',
    enum: ['초급', '중급', '고급'],
  })
  public difficulty: '초급' | '중급' | '고급';

  @ManyToOne(type => User, user => user.lectures, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public user: User;

  @ManyToOne(type => Category, category => category.category_lecture, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public category: Category;

  @OneToMany(type => Video, video => video.lecture, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public lecture_video: Video[];
}

export default Lecture;
