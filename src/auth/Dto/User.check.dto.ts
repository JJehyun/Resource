import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserCheckDto{
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    user: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) // 최소 8 자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자                    정규식
    password: string
}