import { EntityRepository, Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsEntity } from './posts.entity';
import { Express } from 'express';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { UserEntity } from '../user/user.entity';
@EntityRepository(PostsEntity)
export class PostsEntityRepository extends Repository<PostsEntity> {
  async createPost(
    createPostsDto: CreatePostsDto,
    user: UserEntity,
    file: Express.Multer.File,
  ): Promise<PostsEntity> {
    const { desc } = createPostsDto;
    const posts = new PostsEntity();
    posts.user = user;
    posts.desc = desc;
    await posts.save();

    if (file) {
      const imageFile = posts.id + extname(file.originalname);
      fsExtra.move(file.path, `upload/${imageFile}`);
      posts.image = imageFile;
      await posts.save();
    }
    delete posts.user; // จะลบก่อนทำการ return
    return posts;
  }
}
