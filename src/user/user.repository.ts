import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.ato';
import { UnauthorizedException } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // SingUp
  async createUser(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync(); // ทำการซ่อน password

    const user = new User();
    user.username = username;
    user.salt = salt;
    // user.password = password;
    user.password = await this.hashPassword(password, salt); // ทำการไปเรียกใช้ function ข้างล่าง

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
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  // ซ่อนรหัส
  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
