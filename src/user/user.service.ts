import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from 'src/posts/posts.entity';
import { UserCredentialDto } from './dto/user-credential.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(userCredentialDto: UserCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentialDto): Promise<{
    token: string;
  }> {
    const username = await this.userRepository.verifyUserPassword(
      userCredentialDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };
    // return this.userRepository.verifyUserPassword(userCredentialDto);
  }

  getUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const found = await this.userRepository.findOne({
      where: { id },
      // id = id ของ post, userId = user id ของคนที่สร้าง post, user.id จากการกด signIn เข้ามาตอนแรก
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    delete found.post;
    delete found.comment;
    return found;
  }

  async getPostByUserId(id: number): Promise<PostsEntity> {
    const found = await this.userRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Product id:${id} is not found!`);
    }
    return found.post;
  }
}
