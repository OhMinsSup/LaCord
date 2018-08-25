/*
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('calendar')
class Calendar {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    // 여행지
    @Column({
        type: 'varchar'
    })
    public travelge: string;

    // 여행 시작일
    @Column({
        type: 'date'
    })
    public travel_start_day: string;

    // 여행 마지막일
    @Column({
        type: 'date'
    })
    public travel_end_day: string;

    // 여행 시기
    @Column({
        type: 'varchar',
    })
    public travel_season: string;

    // 여행 테마
    @Column({
        type: 'varchar'
    })
    public travel_theme: string;

    
    //TODO: 각 여행지에 대한 좌표를 저장해야하는데, 이걸 테이블로 따로 만들어서 해야하나 아니면 배열로 만들어서 해야할지 정해야한다. 
    //근데 개인적으로는 테이블을 만들어서 하는게 좋을 것 같다는 생각이 든다.
     
    @OneToOne(type => User)
    @JoinColumn()
    public user: User;
}

export default Calendar;
*/