import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './user.jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'daytech',
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserJwtStrategy],
  controllers: [UserController],
  exports: [UserJwtStrategy, PassportModule],
})
export class UserModule {}
