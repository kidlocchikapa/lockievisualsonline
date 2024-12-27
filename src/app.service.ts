import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth/entities/auth.entity';
import { CreateUserDto } from '../src/auth/dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, phoneNumber, password, confirmPassword, termsAccepted } = createUserDto;

    // Validate passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      throw new BadRequestException('Terms and conditions must be accepted');
    }

    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email },
        { phoneNumber }
      ]
    });

    if (existingUser) {
      throw new ConflictException(
        existingUser.email === email 
          ? 'Email already registered' 
          : 'Phone number already registered'
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = this.userRepository.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      termsAccepted
    });

    // Save user
    await this.userRepository.save(user);

    // Return user without password
    const { password: _, ...result } = user;
    return {
      message: 'User registered successfully',
      user: result
    };
  }
}
