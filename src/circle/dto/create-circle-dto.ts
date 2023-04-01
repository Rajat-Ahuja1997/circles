import { IsNotEmpty } from 'class-validator';

export class CreateCircleDto {
  @IsNotEmpty()
  creatorId: number;

  @IsNotEmpty()
  name: string;

  description: string;

  expiration?: Date;
}
