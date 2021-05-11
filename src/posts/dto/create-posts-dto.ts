import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  desc: string;

  @IsOptional()
  image: string;

  @IsOptional()
  userId: number;
}
