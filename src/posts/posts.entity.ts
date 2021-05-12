import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comments/comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column({ default: 'noImage.jpeg' })
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.post, {
    eager: false,
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    eager: true,
  })
  comments: CommentEntity;
}
