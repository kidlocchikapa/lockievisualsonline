import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './app.service';
import { CreateUserDto } from '../src/auth/dto/create-auth.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
