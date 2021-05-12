import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    console.log('service');
    return await this.commentRepository.createComment(createCommentDto, user);
  }

  getComments(user: UserEntity): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  async getCommentById(id: number, user: UserEntity): Promise<CommentEntity> {
    const found = await this.commentRepository.findOne({
      where: { id, userId: user.id },
      // id = id ของ post, userId = user id ของคนที่สร้าง post, user.id จากการกด signIn เข้ามาตอนแรก
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    return found;
  }

  async getCommentByPostId(
    id: number,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const found = await this.commentRepository.findOne({
      where: { id, userId: user.id },
      // id = id ของ post, userId = user id ของคนที่สร้าง post, user.id จากการกด signIn เข้ามาตอนแรก
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    return found;
  }

  async updateCommentById(
    id: number,
    desc: string,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const posts = await this.getCommentById(id, user);
    posts.desc = desc;
    await posts.save();
    return posts;
  }

  async deleteCommentById(
    id: number,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const found = await this.getCommentById(id, user);
    const result = await this.commentRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id:${id} is not found!`);
    } else {
      return found;
    }
  }
}
