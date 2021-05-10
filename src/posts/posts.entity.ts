import { User } from '../user/user.entity';
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
export class Posts extends BaseEntity {
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

  @ManyToOne(() => User, (user) => user.post, { eager: false })
  user: User;
}
