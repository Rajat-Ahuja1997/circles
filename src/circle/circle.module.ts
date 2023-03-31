import { Module } from '@nestjs/common';
import { CircleService } from './circle.service';
import { CircleController } from './circle.controller';

@Module({
  providers: [CircleService],
  controllers: [CircleController]
})
export class CircleModule {}
