import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.entities.config';

@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
