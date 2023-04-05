import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Circle } from './circle.entity';
import { CircleService } from 'src/circle/circle.service';
import { CreateCircleDto } from 'src/circle/dto/create-circle-dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/user/user.entity';
import { GetUserInterceptor } from 'src/auth/get-user.interceptor';

@Controller('circle')
@UseGuards(AuthGuard)
@UseInterceptors(GetUserInterceptor)
export class CircleController {
  constructor(private circleService: CircleService) {}

  @Get('/:id')
  async getCircleById(
    @Param('id') id: number,
    @GetUser() requester: User,
  ): Promise<Circle> {
    const circle = await this.circleService.getCircleById(id);
    return plainToInstance(Circle, circle);
  }

  @Get('/user/:id')
  async getCirclesByUserId(
    @Param('id') id: number,
    @GetUser() requester: User,
  ): Promise<Circle[]> {
    console.log(requester);
    const circles = await this.circleService.getCirclesByUserId(requester, id);
    return circles.map((circle) => plainToInstance(Circle, circle));
  }

  @Post()
  async create(
    @GetUser() requester: User,
    @Body() createCircleDto: CreateCircleDto,
  ): Promise<Circle> {
    const circle = await this.circleService.createCircle(
      requester,
      createCircleDto,
    );
    return plainToInstance(Circle, circle);
  }

  @Post('/add/:id')
  async addMember(
    @GetUser() requester: User,
    @Param('id') circleId: number,
    @Body('userId') userId: number,
  ): Promise<Circle> {
    const circle = await this.circleService.addMemberToCircle(
      requester,
      circleId,
      userId,
    );
    return plainToInstance(Circle, circle);
  }

  @Post('/remove/:id')
  removeMember(
    @GetUser() requester: User,
    @Param('id') circleId: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    return this.circleService.removeMemberFromCircle(
      requester,
      circleId,
      userId,
    );
  }

  @Delete('/:id')
  deleteCircle(
    @GetUser() requester: User,
    @Param('id') id: number,
  ): Promise<void> {
    console.log(requester);
    return this.circleService.deleteCircle(requester, id);
  }
}
