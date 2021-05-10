import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.ato';
import { UnauthorizedException } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // SingUp
  async createUser(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  // SingIn
  async verifyUserPassword(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const user = await this.findOne({ username });
    if (user && (await user.verifyPassword(password))) {
      return user.username;
    } else {
      throw new UnauthorizedException('Error, Invalid Username or Password!');
    }
  }
}
