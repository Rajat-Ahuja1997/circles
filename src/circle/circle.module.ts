import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CircleService } from 'src/circle/circle.service';
import { CircleController } from 'src/circle/circle.controller';
import { Circle } from 'src/circle/circle.entity';
import { UserCircle } from 'src/circle/user-circle.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Circle, UserCircle, User])],
  providers: [CircleService, UserService],
  controllers: [CircleController],
  exports: [CircleService],
})
export class CircleModule {}
