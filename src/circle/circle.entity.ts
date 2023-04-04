import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserCircle } from 'src/circle/user-circle.entity';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @Transform(({ value }) => ({ id: value.id }))
  creator: User;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  expiration: Date;

  @OneToMany(() => UserCircle, (userCircle) => userCircle.circle)
  userCircles: UserCircle[];

  @OneToMany(() => Post, (post) => post.circle)
  posts: Post[];
}
