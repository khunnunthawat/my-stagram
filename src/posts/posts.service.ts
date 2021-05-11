import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsEntity } from './posts.entity';
import { PostsEntityRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: PostsEntityRepository,
  ) {}
  async createPosts(createPostsDto: CreatePostsDto) {
    return await this.postsRepository.createPost(createPostsDto);
  }
}
