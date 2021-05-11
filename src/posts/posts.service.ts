import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsEntity } from './posts.entity';
import { PostsEntityRepository } from './posts.repository';
import * as fsExtra from 'fs-extra';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: PostsEntityRepository,
  ) {}
  async createPosts(
    createPostsDto: CreatePostsDto,
    user: UserEntity,
    file: Express.Multer.File,
  ) {
    return await this.postsRepository.createPost(createPostsDto, user, file);
  }

  getPost(user: UserEntity) {
    return this.postsRepository.find();
    // if (user) {
    //   const qurey = this.postsRepository.createQueryBuilder('user_entity'); // ทำการเรียกใช้ methoad createQueryBuilder แล้วตามด้วยชื่อ Table ใน database
    //   qurey.andWhere('user.username LIKE :user', {
    //     keyword: `%${user}%`,
    //   }); // filter หา keyword โดยการใช้ qurey.andWhere ในการหาคำ
    //   return qurey.getMany(); // .getMany() เป็นการเรียกใช้ข้อมูลที่ป้อนก่อนหน้านี้
    // } else {
    //   return this.postsRepository.find();
    // }
  }

  async getPostById(id: number, user: UserEntity) {
    const found = await this.postsRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    return found;
  }

  async updatePostById(id: number, text: string, user: UserEntity) {
    const posts = await this.getPostById(id, user);
    posts.desc = text;
    posts.user = user;
    await posts.save();
    return posts;
  }

  async deletePost(id: number, user: UserEntity) {
    const found = await this.getPostById(id, user);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`);
    const result = await this.postsRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id:${id} is not found!`);
    }
  }
}
