import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntityRepository } from './posts.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntityRepository]), UserModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
