import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts-dto';
@UseGuards(AuthGuard())
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async addPosts(@Body() createPostsDto: CreatePostsDto) {
    const posts = await this.postsService.createPosts(createPostsDto);
    await posts.save();
    return posts;
  }
}
