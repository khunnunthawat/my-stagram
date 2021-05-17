import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.entities.config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      // รับรุปเข้ามาใน path ของหลังบ้าน
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
