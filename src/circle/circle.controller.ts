import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Circle } from './circle.entity';
import { CircleService } from 'src/circle/circle.service';
import { CreateCircleDto } from 'src/circle/dto/create-circle-dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('circle')
@UseGuards(AuthGuard)
export class CircleController {
  constructor(private circleService: CircleService) {}

  @Get('/:id')
  async getCircleById(@Param('id') id: number): Promise<Circle> {
    const circle = await this.circleService.getCircleById(id);
    return plainToInstance(Circle, circle);
  }

  @Get('/user/:id')
  async getCirclesByUserId(@Param('id') id: number): Promise<Circle[]> {
    const circles = await this.circleService.getCirclesByUserId(id);
    return circles.map((circle) => plainToInstance(Circle, circle));
  }

  @Post()
  async create(@Body() createCircleDto: CreateCircleDto): Promise<Circle> {
    const circle = await this.circleService.createCircle(createCircleDto);
    return plainToInstance(Circle, circle);
  }

  @Post('/add/:id')
  async addMember(
    @Param('id') circleId: number,
    @Body('userId') userId: number,
  ): Promise<Circle> {
    // extract userId from bearer token
    const circle = await this.circleService.addMemberToCircle(circleId, userId);
    return plainToInstance(Circle, circle);
  }

  @Post('/remove/:id')
  removeMember(
    @Param('id') circleId: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    return this.circleService.removeMemberFromCircle(circleId, userId);
  }

  @Delete('/:id')
  deleteCircle(@Param('id') id: number): Promise<void> {
    return this.circleService.deleteCircle(id);
  }
}
