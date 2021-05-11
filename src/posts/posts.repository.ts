import { EntityRepository, Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsEntity } from './posts.entity';
@EntityRepository(PostsEntity)
export class PostsEntityRepository extends Repository<PostsEntity> {
  async createPost(
    createPostsDto: CreatePostsDto,
    filename: string,
  ): Promise<PostsEntity> {
    const { desc, image, userId } = createPostsDto;
    const posts = new PostsEntity();
    posts.desc = desc;
    posts.image = filename;
    posts.userId = userId;
    await posts.save();
    return posts;
  }
}
