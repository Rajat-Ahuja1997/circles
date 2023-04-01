import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Circle } from 'src/circle/circle.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class UserCircle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Circle, (circle) => circle.userCircles)
  circle: Circle;
  
  @ManyToOne(() => User, (user) => user.userCircles)
  user: User;
}
