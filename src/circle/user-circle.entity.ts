import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Circle } from './circle.entity';
import { User } from './user.entity';

@Entity()
export class User_Circles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  circle_id: number;

  @Column()
  user_id: number;
}
