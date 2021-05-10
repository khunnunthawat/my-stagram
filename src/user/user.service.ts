import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.ato';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  singUp(userCredentialDto: UserCredentialDto): Promise<User> {
    return this.userRepository.createUser(userCredentialDto);
  }

  // signIn(userCredentialDto: UserCredentialDto) {}

  // singOut(userCredentialDto: UserCredentialDto) {}
}
