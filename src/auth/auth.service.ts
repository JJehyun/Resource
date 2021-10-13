import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCheckDto } from './Dto/User.check.dto';
import { UserRepository } from './Repository/User.Repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Client } from './Table/client.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
            private userRepository : UserRepository,
            private jwtService : JwtService
    ){}
    
    async GetUser(user : string):Promise<Client>{
        const Client = await this.userRepository.findOne({user})
        if(!Client){
            throw new NotFoundException('아이디를 확인 해주세요')
        }
        return Client;
    }

    async Login(userCheckDto : UserCheckDto){
        const {user,password} = userCheckDto;
        const client = await this.userRepository.findOne({user}) 
        if(client && (await bcrypt.compare(password, await client.password))){
            const payload = {user}
            const accessToken = await this.jwtService.sign(payload)
            const Client = this.GetUser(user);
            (await Client).token = accessToken;
            (await Client).save();
            console.log("로그인 성공, 1시간 토큰 발행 완료!!")
        }else{
            console.log('로그인 실패')
        }
    }

}
