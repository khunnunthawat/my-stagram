import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsRepository } from './posts.repository';
import * as fsExtra from 'fs-extra';
import { UserEntity } from 'src/user/user.entity';
import { PostsEntity } from './posts.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async createPosts(
    createPostsDto: CreatePostsDto,
    user: UserEntity,
    file: Express.Multer.File,
  ): Promise<PostsEntity> {
    return await this.postsRepository.createPost(createPostsDto, user, file);
  }

  // getPost(): Promise<PostsEntity[]> {
  //   return this.postsRepository.find();
  // }

  async getPost(): Promise<PostsEntity[]> {
    const getpost = await this.postsRepository
      .createQueryBuilder('post') //เรียกใช้ table post
      .leftJoinAndSelect('post.user', 'user') //
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'commentedUser')
      .select([
        'post',
        'user.id',
        'user.username',
        'comment',
        'commentedUser.username',
        'commentedUser.id',
      ])
      .orderBy('post.updated', 'DESC') //เรียงโพสต์ DESC = มากไปหน่อย ASC น้อยไปมาก
      .getMany(); // get ค่าทั้งหมด
    // Post.map((comment) => {
    // })
    return getpost;
  }

  async getPostById(id: number, user: UserEntity): Promise<PostsEntity> {
    const found = await this.postsRepository.findOne({
      where: { id, userId: user.id },
      // id = id ของ post, userId = user id ของคนที่สร้าง post, user.id จากการกด signIn เข้ามาตอนแรก
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    return found;
  }

  async updatePostById(
    id: number,
    desc: string,
    user: UserEntity,
  ): Promise<PostsEntity> {
    const posts = await this.getPostById(id, user);
    posts.desc = desc;
    await posts.save();
    return posts;
  }

  async deletePost(id: number, user: UserEntity): Promise<PostsEntity> {
    const found = await this.getPostById(id, user);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`);
    const result = await this.postsRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id:${id} is not found!`);
    } else {
      return found;
    }
  }
}
