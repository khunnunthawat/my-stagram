import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  desc: string;

  @IsOptional()
  userId: number;
}
