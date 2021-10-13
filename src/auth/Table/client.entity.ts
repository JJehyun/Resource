import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
//데이터 베이스 생성 부분!!
@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn()  //자동으로 숫자 증가
    id:number;

    @Column()
    user:string;

    @Column()
    password:string;

    @Column()
    token:string;
}