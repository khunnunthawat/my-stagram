import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  image: string;
}
