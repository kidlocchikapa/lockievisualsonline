import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserService } from './app.service';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'lockievisuals',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}