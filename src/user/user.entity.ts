import { PostsEntity } from '../posts/posts.entity';
import { CommentsEntity } from 'src/comments/comments.entity';
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
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // เหมือน ai ใน sql
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => PostsEntity, (post) => post.user, { eager: true })
  post: PostsEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.user, { eager: true })
  comment: CommentsEntity;

  // ตัวเช็ค password ของ user
  async verifyPassword(password) {
    // const hashPassword = await password;
    const hashPassword = await bcrypt.hash(password, this.salt);
    // console.log(this.password === hashPassword);
    // console.log(this.password, hashPassword);
    // console.log(typeof this.password, typeof hashPassword);
    return this.password === hashPassword;
  }
}
