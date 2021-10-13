import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { AuthService } from './auth.service';
import { UserCheckDto } from './Dto/User.check.dto';
//user : adminadmin
//password : Admin111!
@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}
    //로그인
    @Post('/Login')
    LogIn(@Body(ValidationPipe) userCheckDto: UserCheckDto){
        return this.authService.Login(userCheckDto)
    }


}
