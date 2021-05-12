import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { UserEntity } from '../user/user.entity';
import { GetUsername } from '../user/get-username.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { Get } from '@nestjs/common';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // Create_Posts
  @Post()
  @UsePipes(ValidationPipe)
  addComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(createCommentDto, user);
  }

  // Get_Post
  @Get()
  getComments(): Promise<CommentEntity[]> {
    return this.commentsService.getComments();
  }

  @Get('/:id')
  getCommentById(
    @Param('id') id: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.getCommentById(id, user);
  }

  @Get('post/:post_id')
  getCommentByPostId(
    @Param('post_id') postId: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.getCommentByPostId(postId, user);
  }

  // Update_Post
  @Patch('edit/:post_id')
  updateCommentById(
    @Param('post_id') id: number,
    @Body('desc') desc: string,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.updateCommentById(id, desc, user);
  }

  // Delete_Post
  @Delete('/:id')
  deleteCommentById(
    @Param('id') id: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.deleteCommentById(id, user);
  }
}
