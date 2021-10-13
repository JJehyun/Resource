import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { UserRepository } from "../Repository/User.Repository";
import { Client } from "../Table/client.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){
        super({
            secretOrKey : 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async Validate(payload):Promise<Client>{
        const {user} = payload;
        const Person:Client = await this.userRepository.findOne({user})
        //유저가 없는 경우
        if(!Person){
            throw new UnauthorizedException();
        }
        return Person
    }
}