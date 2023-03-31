import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  circle_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  expiration: Date;

  @ManyToMany(() => User, (user) => user.circles)
  @JoinTable()
  members: User[];
}
