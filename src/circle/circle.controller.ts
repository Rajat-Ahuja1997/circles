import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Circle } from './circle.entity';
import { CircleService } from './circle.service';
import { CreateCircleDto } from './dto/create-circle-dto';

@Controller('circle')
export class CircleController {
  // constructor with circle service
  constructor(private circleService: CircleService) {}

  @Get('/:id')
  getCircleById(@Param('id') id: number): Promise<Circle> {
    return this.circleService.getCircleById(id);
  }

  @Post()
  create(@Body() createCircleDto: CreateCircleDto): Promise<Circle> {
    return this.circleService.createCircle(createCircleDto);
  }

  // add member to circle
  @Post('/:id')
  addMember(@Param('id') id: number): Promise<Circle> {
    return this.circleService.addMember(id);
  }
  
  @Delete('/:id')
  deleteCircle(@Param('id') id: number): Promise<void> {
    return this.circleService.deleteCircle(id);
  }
}
