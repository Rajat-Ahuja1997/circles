import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserCircle } from 'src/circle/user-circle.entity';
import { Post } from 'src/post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created: Date;

  @OneToMany(() => UserCircle, (userCircle) => userCircle.user)
  userCircles: UserCircle[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
