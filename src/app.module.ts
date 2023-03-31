import { Module } from '@nestjs/common';
import { CircleModule } from './circle/circle.module';

@Module({
  imports: [CircleModule],
})
export class AppModule {}
