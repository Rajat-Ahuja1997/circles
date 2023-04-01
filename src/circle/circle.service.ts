import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Circle } from './circle.entity';
import { CreateCircleDto } from './dto/create-circle-dto';

@Injectable()
export class CircleService {
  constructor(
    @InjectRepository(Circle)
    private circleRepository: Repository<Circle>,
  ) {}

  async getCircle(id: number): Promise<Circle> {
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
    return circle;
  }
}
