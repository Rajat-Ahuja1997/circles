import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { CircleService } from 'src/circle/circle.service';
import { CreatePostDto } from 'src/post/dto/create-post-dto';
import { User } from 'src/user/user.entity';
import { Circle } from 'src/circle/circle.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(CircleService)
    private readonly circleService: CircleService,
  ) {}

  //TODO: Test this
  async getPostsByUserId(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: {
        author: { id: userId },
      },
      relations: ['circle'],
    });
    return posts;
  }

  /**
   * Get all posts in a circle
   * @param circleId
   * @returns array of posts
   */
  async getPostsByCircleId(circleId: number): Promise<Post[]> {
    const circle = await this.circleService.getCircleById(circleId);
    // check for userId param and make sure user is in circle

    const posts = await this.postRepository.find({
      where: {
        circle: { id: circleId },
      },
      relations: ['circle', 'author'],
    });
    return posts;
  }

  /**
   * Get a post by id
   * @param id
   * @returns post
   */
  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  /**
   * Create a post
   * @param createPostDto
   * @returns created post
   * @throws UnauthorizedException if user is not a member of the circle
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { content, authorId, circleId } = createPostDto;
    const circle: Circle = await this.circleService.getCircleById(circleId);
    const users: User[] = await this.circleService.getMembersOfCircle(new User(), circleId);

    const user = this.userInCircle(authorId, users);
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to post in this circle',
      );
    }

    const post = this.postRepository.create({
      content,
      author: user,
      circle,
    });

    await this.postRepository.save(post);
    return post;
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  private userInCircle = (userId: number, users: User[]): User => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == userId) {
        return users[i];
      }
    }
    return null;
  };
}
