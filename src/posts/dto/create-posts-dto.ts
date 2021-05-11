import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  image: string;

  @IsOptional()
  userId: number;
}
