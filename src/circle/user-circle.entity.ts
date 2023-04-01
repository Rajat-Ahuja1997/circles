import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserCircle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  circleId: number;

  @Column()
  userId: number;
}
