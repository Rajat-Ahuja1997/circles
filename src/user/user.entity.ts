import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserCircle } from 'src/circle/user-circle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created: Date;

  @OneToMany(() => UserCircle, userCircle => userCircle.user)
  userCircles: UserCircle[];
}
