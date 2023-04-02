import { Body, Controller, Delete, Param, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Post as CirclePost } from './post.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<CirclePost> {
    return this.postService.createPost(createPostDto);
  }

  //get post by id
  @Get('/:id')
  getPost(@Param('id') id: number): Promise<CirclePost> {
    return this.postService.getPostById(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.postService.deletePost(id);
  }
  
}
