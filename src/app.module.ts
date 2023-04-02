import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircleModule } from 'src/circle/circle.module';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
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
    PostModule,
    CircleModule
  ],
})
export class AppModule {}
