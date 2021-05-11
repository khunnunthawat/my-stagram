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
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUsername } from 'src/user/get-username.decorator';
import { PostsEntity } from './posts.entity';
import { UserEntity } from 'src/user/user.entity';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Create_Posts
  @Post('/upload')
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
    await posts.save();
    return posts;
  }

  // Get_Post
  @Get('/get')
  getPosts(@GetUsername() user: UserEntity) {
    return this.postsService.getPost(user);
  }

  @Get('/:id')
  getPostsById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.getPostById(id, user);
  }

  @Put('/:id/text')
  async UpdatePostById(
    @Param('id') id: number,
    @Body('text') text: string,
    @GetUsername() user: UserEntity,
  ) {
    return await this.postsService.updatePostById(id, text, user);
  }

  // Update_Post
  // @Put('/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // async UpdatePostById(
  //   @UploadedFile() file,
  //   @Param('id') id: number,
  //   @Body() createPostsDto: CreatePostsDto,
  //   @GetUsername() user: UserEntity,
  // ): Promise<PostsEntity> {
  //   createPostsDto.userId = user.id;
  //   const posts = await this.postsService.updatePost(id, createPostsDto);
  //   if (file) {
  //     posts.userId = user.id;
  //     const imageFile = posts.id + extname(file.originalname);
  //     fsExtra.move(file.path, `upload/${imageFile}`);
  //     posts.image = imageFile;
  //     await posts.save();
  //   }
  //   return posts;
  // }

  // Delete_Post
  @Delete('/:id')
  deletePostsById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.deletePost(id, user);
  }
}
