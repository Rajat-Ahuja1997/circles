import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Circle } from './circle.entity';
import { CircleService } from './circle.service';
import { CreateCircleDto } from './dto/create-circle-dto';

@Controller('circle')
export class CircleController {
  constructor(private circleService: CircleService) {}

  @Get('/:id')
  getCircleById(@Param('id') id: number): Promise<Circle> {
    return this.circleService.getCircleById(id);
  }

  @Get('/user/:id')
  getCirclesByUserId(@Param('id') id: number): Promise<Circle[]> {
    return this.circleService.getCirclesByUserId(id);
  }

  @Post()
  create(@Body() createCircleDto: CreateCircleDto): Promise<Circle> {
    return this.circleService.createCircle(createCircleDto);
  }

  @Post('/add/:id')
  addMember(
    @Param('circleId') circleId: number,
    @Body('userId') userId: number,
  ): Promise<Circle> {
    return this.circleService.addMemberToCircle(circleId, userId);
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
