import { UserEntity } from 'src/user/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(
    createCommentsDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { desc, postId } = createCommentsDto;
    const comment = new CommentEntity();

    comment.desc = desc;
    comment.user = user;
    comment.postId = postId;
    await comment.save();

    delete comment.user; // จะลบก่อนทำการ return
    return comment;
  }
}
