import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Circle } from 'src/circle/circle.entity';
import { CreateCircleDto } from 'src/circle/dto/create-circle-dto';
import { UserCircle } from 'src/circle/user-circle.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CircleService {
  constructor(
    @InjectRepository(Circle)
    private circleRepository: Repository<Circle>,
    @InjectRepository(UserCircle)
    private userCircleRepository: Repository<UserCircle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @param userId
   * @returns circles that the user is a member of
   */
  async getCirclesByUserId(requester: User, userId: number): Promise<Circle[]> {
    const circles = await this.circleRepository
      .createQueryBuilder('circle')
      .innerJoin('user_circle', 'uc', 'uc.circleId = circle.id')
      .where('uc.userId = :userId', { userId })
      .getMany();
    return circles;
  }

  /**
   * @param id
   * @returns circle with id
   */
  async getCircleById(id: number): Promise<Circle> {
    const found = await this.circleRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Circle with ID '${id}' not found`);
    }
    return found;
  }

  /**
   * Creates a new circle and adds the creator as a member
   * @param createCircleDto
   * @returns
   */
  async createCircle(
    requester: User,
    createCircleDto: CreateCircleDto,
  ): Promise<Circle> {
    const { name, description, expiration } = createCircleDto;
    const circle = this.circleRepository.create({
      creator: requester,
      name,
      description,
      expiration,
    });

    await this.circleRepository.save(circle);

    const userCircle = this.userCircleRepository.create({
      user: requester,
      circle: circle,
    });
    await this.userCircleRepository.save(userCircle);
    // await this.addMemberToCircle(requester, circle.id, requester.id);
    return circle;
  }

  /**
   * Deletes a circle and all user_circle entities associated with it
   * @param id
   * @throws NotFoundException if circle does not exist
   * @throws NotFoundException if user does not exist
   * @throws NotFoundException if user is not a member of the circle
   * */
  async deleteCircle(requester: User, id: number): Promise<void> {
    console.log(requester)
    const circle = await this.getCircleById(id);
    console.log(circle)
    if (circle.creator.id !== requester.id) {
      throw new UnauthorizedException(
        'You do not have permission to delete this circle.',
      );
    }
    const result = await this.userCircleRepository
      .createQueryBuilder()
      .delete()
      .from(UserCircle)
      .where('circleId = :id', { id: id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Circle with ID '${id}' not found`);
    }
    await this.circleRepository.delete(id);
  }

  /**
   * Get all members of a circle
   * @param id
   * @returns
   */
  async getMembersOfCircle(requester: User, id: number): Promise<User[]> {
    // TODO: protect this where you can only see it if you are a member of the circle
    const members = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user_circle', 'uc', 'uc.userId = user.id')
      .where('uc.circleId = :circleId', { circleId: id })
      .getMany();
    return members;
  }

  /**
   * Adds a user to a circle and creates a new user_circle relation
   * @param id
   * @param userId
   * @returns circle that the user was added to
   */
  async addMemberToCircle(
    requester: User,
    id: number,
    userId: number,
  ): Promise<Circle> {
    const circle = await this.getCircleById(id); //FIX THIS
    if (circle.creator.id !== requester.id) {
      throw new UnauthorizedException(
        'You do not have permission to add a member to this circle.',
      );
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    const userCircle = this.userCircleRepository.create({
      user: user,
      circle: circle,
    });

    await this.userCircleRepository.save(userCircle);
    return circle;
  }

  /**
   * Removes a user from a circle and deletes the user_circle relation
   * @param circleId
   * @param userId
   * @throws NotFoundException if user is not a member of the circle
   * */
  async removeMemberFromCircle(
    requester: User,
    circleId: number,
    userId: number,
  ): Promise<void> {
    const circle = await this.getCircleById(circleId);
    if (circle.creator.id !== requester.id) {
      throw new UnauthorizedException(
        'You do not have permission to remove a member from this circle.',
      );
    }
    //TODO: check that user is a creator of the circle
    const result = await this.userCircleRepository
      .createQueryBuilder()
      .delete()
      .from(UserCircle)
      .where({ circle: circleId, user: userId })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(
        `User with id: ${userId} not found in circle with id: ${circleId}`,
      );
    }
  }
  // TODO: add cleanup for when a circle has no members in user_circle --> delete circle --> do this in a cron job
}
