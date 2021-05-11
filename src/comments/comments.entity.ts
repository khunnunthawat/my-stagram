import { UserEntity } from '../user/user.entity';
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
export class CommentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => UserEntity, (user) => user.comment, { eager: false })
  user: UserEntity;
}
