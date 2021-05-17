###
  [GET] /posts/:post_id
  [POST] /posts
  [PATCH] /posts/:post_id
  [DELETE] /posts/:post_id
  [GET] /comments?post_id=:post_id
  [POST] /comments
  [PATCH] /comments/:comment_id
  [DELETE] /comments/:comment_id
  [GET] /users/:user_id
  [GET] /users/:user_id/posts
###

###
  npm install :
  npm i @nestjs/typeorm
  npm i typeorm --save
  npm i pg --save
  npm i rxjs
  npm i class-validator
  npm i class-transformer
  npm i change-case
  npm i bcrypt ซ้อน password
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt
  npm i fs-extra
  npm i multer
  npm i -D @types/multer
  npm i --save @nestjs/serve-static

  nest create :
  nest g module user --no-spec
  nest g s user --no-spec
  nest g co user --no-spec
  nest g mo posts --no-spec
  nest g s posts --no-spec
  nest g co posts --no-spec
  nest g mo comment --no-spec
  nest g s comment --no-spec
  nest g co comment --no-spec
  nest g gu my --no-spec
###

###
// Setup TypeOrm configuration
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'daytechstagram',
  entities: [__dirname + '/../**/*.entities.{js,ts}'],
  synchronize: true,
}
###

###
  FileUpload
  https://docs.nestjs.com/techniques/file-upload#file-upload
  @UseInterceptors(FileInterceptor('file'))
  npm i multer
  npm i fs-extra
  npm i path
  UpDate : https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-types-for-postgres
###

###
  Authentication
  https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
  // Maybe validator here
  export class SignUpDto {
      @IsString()
      @MinLength(4)
      @MaxLength(20)
      username: string;

      @IsString()
      @MinLength(4)
      @MaxLength(20)
      @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
      password: string;
  }
###

###
  JWT = JSON WEB TOKEN
  เป็นการสร้าง token ที่ผ่านกระบวนการ singin หรือ login
  passportjs : http://www.passportjs.org/packages/
  https://www.codota.com/code/javascript/functions/passport-jwt/fromAuthHeaderAsBearerToken
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt
###

###
  import { Post as post } from './post.entity';  ใช้ as แทนในการเรียกใช้คำหลัง
  // @Post('/upload')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './upload',
  //     }),
  //   }),
  // )
  // @UsePipes(ValidationPipe)
  // async addPosts(
  //   @UploadedFile() file,
  //   @Body() createPostsDto: CreatePostsDto,
  //   @GetUsername() user: UserEntity,
  // ): Promise<PostsEntity> {
  //   createPostsDto.userId = user.id;
  //   // return this.postsService.createPosts(createPostsDto);
  //   const posts = await this.postsService.createPosts(
  //     createPostsDto,
  //     file.filename,
  //   );
  //   posts.userId = user.id;
  //   const imageFile = posts.id + extname(file.originalname);
  //   fsExtra.move(file.path, `upload/${imageFile}`);
  //   posts.image = imageFile;
  //   await posts.save();
  //   return posts;
  // }
###


