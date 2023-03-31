import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleService {
  // create circle
  create(createCircleDto: any) {
    return 'This action adds a new circle';
  }
}
