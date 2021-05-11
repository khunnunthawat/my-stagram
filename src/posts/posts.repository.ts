import { EntityRepository, Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsEntity } from './posts.entity';
// image
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';

@EntityRepository(PostsEntity)
export class PostsEntityRepository extends Repository<PostsEntity> {
  async createPost(createPostsDto: CreatePostsDto): Promise<PostsEntity> {
    const { desc, image, userId } = createPostsDto;
    const posts = new PostsEntity();
    posts.desc = desc;
    posts.image = image;
    posts.userId = userId;
    await posts.save();
    return posts;
  }

  // async storageImage() {
  //   storage: diskStorage({
  //       destination: './upload',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         return cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  // }
}

// const posts = await this.postsService.createPosts(createPostsDto);
// const imageFile = posts.id + extname(file.filename);
// fsExtra.move(file.path, `upload/${imageFile}`);
// posts.image = imageFile;
// await posts.save();
// return posts;
