import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { CircleService } from 'src/circle/circle.service';
import { CreatePostDto } from 'src/post/dto/create-post-dto';
import { User } from 'src/user/user.entity';
import { Circle } from 'src/circle/circle.entity';
import { UserCircle } from 'src/circle/user-circle.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(CircleService)
    private readonly circleService: CircleService,
    @InjectRepository(UserCircle)
    private userCircleRepository: Repository<UserCircle>,
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
  async getPostsByCircleId(requester: User, circleId: number): Promise<Post[]> {
    const circle = await this.circleService.getCircleById(circleId);
    if (!circle) {
      throw new NotFoundException(`Circle with ID '${circleId}' not found`);
    }
    const user = await this.userCircleRepository.findOneBy({
      circle: circle,
      user: requester,
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to view this post',
      );
    }

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
  async getPostById(requester: User, id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    const users = await this.circleService.getMembersOfCircle(
      new User(),
      post.circle.id,
    );

    if (!this.userInCircle(requester.id, users)) {
      throw new UnauthorizedException(
        'You are not authorized to view this post',
      );
    }
    return post;
  }

  /**
   * Create a post
   * @param createPostDto
   * @returns created post
   * @throws UnauthorizedException if user is not a member of the circle
   */
  async createPost(
    requester: User,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const { content, circleId } = createPostDto;
    const circle: Circle = await this.circleService.getCircleById(circleId);

    const user = await this.userCircleRepository.findOneBy({
      circle: circle,
      user: requester,
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to create a post in this circle',
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

  async deletePost(requester: User, id: number): Promise<void> {
    const post = await this.getPostById(id);
    if (post.author.id !== requester.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }
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
