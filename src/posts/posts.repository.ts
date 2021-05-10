import { EntityRepository, Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { Posts } from './posts.entity';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async createPost(createPostsDto: CreatePostsDto): Promise<Posts> {
    const { desc, image } = createPostsDto;
    const posts = new Posts();
    posts.desc = desc;
    posts.image = image;
    await posts.save();
    return posts;
  }
}
