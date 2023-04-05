import { Module } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PostController } from 'src/post/post.controller';
import { CircleService } from 'src/circle/circle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { Circle } from 'src/circle/circle.entity';
import { UserCircle } from 'src/circle/user-circle.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Circle, UserCircle, User])],
  providers: [PostService, CircleService, UserService],
  controllers: [PostController],
})
export class PostModule {}
