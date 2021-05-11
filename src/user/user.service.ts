import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.ato';
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
}
