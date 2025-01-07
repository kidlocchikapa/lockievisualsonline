// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'; // Add this
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { JwtStrategy } from './strategies/jwt.strategy'; // Add this

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy here
  exports: [AuthService, JwtModule, PassportModule], // Add exports
})
export class AuthModule {}