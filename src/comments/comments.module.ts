import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CommentRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), UserModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
