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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
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
    const posts = await this.postsService.createPosts(createPostsDto);
    posts.userId = user.id;
    const imageFile = posts.id + extname(file.filename);
    fsExtra.move(file.path, `upload/${imageFile}`);
    posts.image = imageFile;
    await posts.save();
    return posts;
  }
}
