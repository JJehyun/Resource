import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './Repository/User.Repository';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
      secret:"secret",
      signOptions:{expiresIn:3600}
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
