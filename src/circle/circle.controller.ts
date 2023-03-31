import { Controller } from '@nestjs/common';

@Controller('circle')
export class CircleController {
  // constructor with circle service
  constructor(private circleService: CircleService) {}

  // create circle
  @Post()
  create(@Body() createCircleDto: CreateCircleDto) {
    return this.circleService.create(createCircleDto);
  }
}
