import { EntityRepository, Repository } from "typeorm";
import { UserCheckDto } from "../Dto/User.check.dto";
import { Client } from "../Table/client.entity";
import * as bcrypt from 'bcryptjs'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
@EntityRepository(Client)
export class UserRepository extends Repository<Client>{

    async CreateUser(userCheckDto : UserCheckDto){
        const {user ,password} = userCheckDto
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const client = this.create({  
            user : user,
            password : hashedPassword
        })
        try{
            await this.save(client);
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){
                console.log(error)
                throw new ConflictException('이미 존재하는 id 입니다.')
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}