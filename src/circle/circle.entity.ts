import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserCircle } from './user-circle.entity';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creatorId: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  expiration: Date;

  @OneToMany(() => UserCircle, userCircle => userCircle.circle)
  userCircles: UserCircle[];
}
