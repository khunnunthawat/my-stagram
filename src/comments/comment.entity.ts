import { UserEntity } from '../user/user.entity';
import { PostsEntity } from '../posts/posts.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => UserEntity, (user) => user.comment, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => PostsEntity, (post) => post.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  post: PostsEntity;
}
