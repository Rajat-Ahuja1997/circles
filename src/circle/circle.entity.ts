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
  id: number;

  @Column()
  name: string;

  @Column()
  creatorId: number;

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
