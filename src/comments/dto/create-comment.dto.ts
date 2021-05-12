import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  postId: number;
}
