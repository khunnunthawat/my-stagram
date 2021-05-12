import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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

  async signIn(userCredentialDto: UserCredentialDto) {
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
  // singOut(userCredentialDto: UserCredentialDto) {}

  getUser(user: UserEntity) {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
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
}
