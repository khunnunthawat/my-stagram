import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialDto } from './dto/user-credential.ato';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/singup')
  @UsePipes(ValidationPipe)
  singUp(@Body() userCredentialDto: UserCredentialDto): Promise<User> {
    console.log('singUp : ', userCredentialDto);
    return this.userService.singUp(userCredentialDto);
  }

  // @Post('/singin')
  // singIn(@Body() userCredentialDto: UserCredentialDto) {
  //   console.log('singIn : ', userCredentialDto);
  // }

  // @Post('/singout')
  // singOut(@Body() userCredentialDto: UserCredentialDto) {
  //   console.log('singOut : ', userCredentialDto);
  // }
}
