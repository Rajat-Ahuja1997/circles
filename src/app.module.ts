import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircleModule } from './circle/circle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CircleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'rajatahuja',
      database: 'rajatahuja',
    }),
    UserModule,
  ],
})
export class AppModule {}
