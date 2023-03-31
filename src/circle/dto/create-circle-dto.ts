import { IsNotEmpty } from 'class-validator';

export class CreateCircleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
  description: string;

  // optional field expiration
  expiration?: Date;
}
