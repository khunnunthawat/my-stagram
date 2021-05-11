import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialDto } from './dto/user-credential.ato';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  singUp(@Body() userCredentialDto: UserCredentialDto): Promise<UserEntity> {
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

  @Get()
  getUser(@GetUsername() user: UserEntity) {
    return this.userService.getUser(user);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    // console.log(req);
    // return req.user.username;
    return username;
  }
}
