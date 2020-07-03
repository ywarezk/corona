import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
// import { User } from './user.entity';

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    time: Date;

    // @ManyToOne(() => User)
    // user: User;
}
