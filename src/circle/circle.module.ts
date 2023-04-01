import { Module } from '@nestjs/common';
import { CircleService } from './circle.service';
import { CircleController } from './circle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circle } from './circle.entity';
import { UserCircle } from './user-circle.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circle, UserCircle, User])],
  providers: [CircleService],
  controllers: [CircleController],
})
export class CircleModule {}
