import { IsNotEmpty } from 'class-validator';

export class CreateCircleDto {
  @IsNotEmpty()
  name: string;

  description: string;

  expiration?: Date;
}
