import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUsername } from 'src/user/get-username.decorator';
import { PostsEntity } from './posts.entity';
// image
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { UserEntity } from 'src/user/user.entity';
@UseGuards(AuthGuard())
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
      }),
    }),
  )
  @UsePipes(ValidationPipe)
  async addPosts(
    @UploadedFile() file,
    @Body() createPostsDto: CreatePostsDto,
    @GetUsername() user: UserEntity,
  ): Promise<PostsEntity> {
    createPostsDto.userId = user.id;
    // return this.postsService.createPosts(createPostsDto);
    const posts = await this.postsService.createPosts(
      createPostsDto,
      file.filename,
    );
    posts.userId = user.id;
    const imageFile = posts.id + extname(file.originalname);
    fsExtra.move(file.path, `upload/${imageFile}`);
    posts.image = imageFile;
    await posts.save();
    return posts;
  }
}
