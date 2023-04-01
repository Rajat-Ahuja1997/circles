import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Circle } from './circle.entity';
import { CreateCircleDto } from './dto/create-circle-dto';
import { UserCircle } from './user-circle.entity';

@Injectable()
export class CircleService {
  constructor(
    @InjectRepository(Circle)
    private circleRepository: Repository<Circle>,
    @InjectRepository(UserCircle)
    private userCircleRepository: Repository<UserCircle>,
  ) {}

  // return list of circle ids that contain a member with userId
  async getCirclesByUserId(userId: number): Promise<Circle[]> {
    const circles = await this.circleRepository
      .createQueryBuilder('circle')
      .innerJoin('user_circle', 'uc', 'uc.circleId = circle.id')
      .where('uc.userId = :userId', { userId })
      .getMany();
    return circles;
  }

  async getCircleById(id: number): Promise<Circle> {
    const found = this.circleRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Circle with ID '${id}' not found`);
    }
    return found;
  }

  async createCircle(createCircleDto: CreateCircleDto): Promise<Circle> {
    const { creatorId, name, description, expiration } = createCircleDto;
    const circle = this.circleRepository.create({
      creatorId,
      name,
      description,
      expiration,
    });
    await this.circleRepository.save(circle);
    this.addMemberToCircle(circle.id, creatorId);
    return circle;
  }

  async deleteCircle(id: number): Promise<void> {
    await this.userCircleRepository.delete({ circleId: id });
    const result = await this.circleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Circle with ID '${id}' not found`);
    }
  }

  // add member to circle and create a new user_circle entity
  async addMemberToCircle(id: number, userId: number): Promise<Circle> {
    const circle = this.getCircleById(id);
    /* check if circle exists
    check if user exists
    add permissioning for who can add to a circle */

    const userCircle = this.userCircleRepository.create({
      circleId: id,
      userId: userId,
    });
    await this.userCircleRepository.save(userCircle);
    return circle;
  }

  async removeMemberFromCircle(circleId: number, userId: number): Promise<void> {
    const result = await this.userCircleRepository.delete({
      userId: userId,
      circleId: circleId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `User with id: ${userId} not found in circle with id: ${circleId}`,
      );
    }
    // add cleanup for when a circle has no members in user_circle --> delete circle
  }
}
