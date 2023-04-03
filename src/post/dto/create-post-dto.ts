import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  circleId: number; 
}