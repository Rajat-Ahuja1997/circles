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
  @Column()
  user_id: number;

  @Column()
  circle_id: number;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.circles)
  user: User;

  @ManyToMany(() => Circle, (circle) => circle.members)
  circle: Circle;
}
