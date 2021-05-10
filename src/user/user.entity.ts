import { Posts } from '../posts/posts.entity';
import { Comments } from 'src/comments/comments.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() // เหมือน ai ใน sql
  id: number;

  @Column() // ทำการสร้างใน table
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Posts, (post) => post.user, { eager: true })
  post: Posts;

  @OneToMany(() => Comments, (comment) => comment.user, { eager: true })
  comment: Comments;
}
