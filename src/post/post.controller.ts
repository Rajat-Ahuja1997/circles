import { Body, Controller, Delete, Param, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Post as CirclePost } from './post.entity';
import { plainToInstance } from 'class-transformer';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<CirclePost> {
    const post = await this.postService.createPost(createPostDto);
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
    console.log(post);

    return plainToInstance(CirclePost, post);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }
}
