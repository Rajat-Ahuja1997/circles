import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { CircleService } from 'src/circle/circle.service';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(CircleService)
    private readonly circleService: CircleService,
  ) {}

  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { content, author, circleId } = createPostDto;
    const circle = await this.circleService.getCircleById(circleId);

    //TODO: check if user is in circle
    
    const post = this.postRepository.create({
      content,
      author,
      circle,
    });
    await this.postRepository.save(post);
    return post;
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  /**  @Column()
  id: number;

  @Column()
  content: string;

  @Column()
  author: number;

  @Column()
  likes: number;

  @Column()
  created: Date;

  @Column()
  circle: Circle;
 */

}
