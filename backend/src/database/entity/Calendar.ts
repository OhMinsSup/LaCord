import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import Post from './Post';
import User from './User';

@Entity('calendar')
class Calendar {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}

export default Calendar;