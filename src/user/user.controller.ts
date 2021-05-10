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

  @Post('/signup')
  @UsePipes(ValidationPipe)
  singUp(@Body() userCredentialDto: UserCredentialDto): Promise<User> {
    console.log('signUp : ', userCredentialDto);
    return this.userService.signUp(userCredentialDto);
  }

  @Post('/signin')
  singIn(@Body() userCredentialDto: UserCredentialDto) {
    // console.log('signIn : ', userCredentialDto);
    return this.userService.signIn(userCredentialDto);
  }

  // @Post('/signout')
  // signOut(@Body() userCredentialDto: UserCredentialDto) {
  //   console.log('signOut : ', userCredentialDto);
  // }
}
