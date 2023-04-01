import { Module } from '@nestjs/common';
import { CircleService } from './circle.service';
import { CircleController } from './circle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circle } from './circle.entity';
import { UserCircle } from './user-circle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circle, UserCircle])],
  providers: [CircleService],
  controllers: [CircleController],
})
export class CircleModule {}
