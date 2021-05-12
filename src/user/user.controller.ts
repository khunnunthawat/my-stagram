import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';
import { PostsEntity } from '../posts/posts.entity';

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
  singIn(@Body() userCredentialDto: UserCredentialDto): Promise<{
    token: string;
  }> {
    return this.userService.signIn(userCredentialDto);
  }

  @Get()
  getUser(@GetUsername() user: UserEntity): Promise<UserEntity[]> {
    return this.userService.getUser(user);
  }

  @Get('/:user_id')
  getUserById(@Param('user_id') id: number): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Get('/:user_id/posts')
  getPostByUserId(@Param('user_id') id: number): Promise<PostsEntity> {
    return this.userService.getPostByUserId(id);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    return username;
  }
}
