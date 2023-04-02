import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author: number;

  @IsNotEmpty()
  circleId: number; 
}