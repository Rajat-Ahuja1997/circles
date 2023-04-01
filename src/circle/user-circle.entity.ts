import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserCircles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  circleId: number;

  @Column()
  userId: number;
}
