import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:'mysql',
    host:'gamedatabasesyu.c2odoabccx38.ap-northeast-2.rds.amazonaws.com',
    port:3306,
    username: 'admin',
    password: 'adminadmin',
    database: 'Test',
    entities: [__dirname + '../../**/Table/*.entity.{js,ts}'], //를 이용해서 데이터 베이스 테이블 을 생성한다. 그 데이터베이스 테이블을 생성할 파일 위치를 지정하는 공간
    synchronize:true  //app이 실행될 때마다 위해서 만든 entities가 변경 되는 것을 감지하고 데이터 베이스에서 수정을 한다. 
}