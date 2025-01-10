import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UserService } from './app.service';
import { User } from './auth/entities/auth.entity';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import configuration from '../config';
import { Feedback } from './feedback/entities/feedback.entity';


@Module({
  imports: [ FeedbackModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql107.infinityfree.com',
      port: 3306,
      username: 'root',
      password: '',
      database: 'if0_38079668_lockievisuals',
      entities: [User, Feedback],
      synchronize: true,
      logging: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn', '1d'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}