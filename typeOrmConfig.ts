import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import { User } from "src/auth/entities/auth.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'Lockievisuals',
        entities: [User],
        synchronize: true,
      }
