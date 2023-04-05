import {
  Body,
  Controller,
  Delete,
  Param,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PostService } from 'src/post/post.service';
import { CreatePostDto } from 'src/post/dto/create-post-dto';
import { Post as CirclePost } from 'src/post/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserInterceptor } from 'src/auth/get-user.interceptor';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user-decorator';

@Controller('post')
@UseGuards(AuthGuard)
@UseInterceptors(GetUserInterceptor)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(
    @GetUser() requester: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<CirclePost> {
    const post = await this.postService.createPost(requester, createPostDto);
    return plainToInstance(CirclePost, post);
  }

  @Get('/user/:id')
  async getPostsByUserId(@Param('id') id: number): Promise<CirclePost[]> {
    const post = await this.postService.getPostsByUserId(id);
    return plainToInstance(CirclePost, post);
  }

  @Get('/circle/:id')
  async getPostsByCircleId(@Param('id') id: number): Promise<CirclePost[]> {
    const posts = await this.postService.getPostsByCircleId(id);
    return posts.map((post) => plainToInstance(CirclePost, post));
  }

  @Get('/:id')
  async getPost(@Param('id') id: number): Promise<CirclePost> {
    const post = await this.postService.getPostById(id);

    return plainToInstance(CirclePost, post);
  }

  @Delete('/:id')
  deletePost(
    @GetUser() requester: User,
    @Param('id') id: number,
  ): Promise<void> {
    return this.postService.deletePost(requester, id);
  }
}
