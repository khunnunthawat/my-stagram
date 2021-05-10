import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { Posts } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: PostsRepository,
  ) {}
  async createPosts(createPostsDto: CreatePostsDto) {
    return await this.postsRepository.createPost(createPostsDto);
  }
}
