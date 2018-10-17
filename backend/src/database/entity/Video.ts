import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Lecture from './Lecture';

@Entity('video')
class Video {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
  })
  public sub_heading: string;

  @Column({
    type: 'varchar',
  })
  public video_url: string;

  @ManyToOne(type => Lecture, lecture => lecture.lecture_video, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  public lecture: Lecture;
}

export default Video;
