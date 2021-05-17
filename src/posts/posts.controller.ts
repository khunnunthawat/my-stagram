import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUsername } from 'src/user/get-username.decorator';
import { PostsEntity } from './posts.entity';
import { UserEntity } from 'src/user/user.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Create_Posts
  @Post('/new')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async addPosts(
    @UploadedFile() file,
    @Body() createPostsDto: CreatePostsDto,
    @GetUsername() user: UserEntity,
  ): Promise<PostsEntity> {
    const posts = await this.postsService.createPosts(
      createPostsDto,
      user,
      file,
    );
    return posts;
  }

  // Get_Post
  @Get()
  getPosts(): Promise<PostsEntity[]> {
    return this.postsService.getPost();
  }

  @Get('/:post_id')
  getPostById(
    @Param('post_id') id: number,
    @GetUsername() user: UserEntity,
  ): Promise<PostsEntity> {
    return this.postsService.getPostById(id, user);
  }

  // Update_Post
  @Patch('edit/:post_id')
  async UpdatePostById(
    @Param('post_id') id: number,
    @Body('desc') desc: string,
    @GetUsername() user: UserEntity,
  ): Promise<PostsEntity> {
    return await this.postsService.updatePostById(id, desc, user);
  }

  // Delete_Post
  @Delete('/:id')
  deletePostsById(
    @Param('id') id: number,
    @GetUsername() user: UserEntity,
  ): Promise<PostsEntity> {
    return this.postsService.deletePost(id, user);
  }
}
