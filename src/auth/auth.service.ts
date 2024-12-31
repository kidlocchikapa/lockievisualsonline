import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    console.log('AuthService initialized');
  }

  async register(registerDto: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    termsAccepted: boolean;
  }): Promise<{ access_token: string }> {
    try {
      console.log('Starting registration:', registerDto);

      // Check if user already exists
      const existingUser = await this.usersRepository.findOne({
        where: [
          { email: registerDto.email },
          { phoneNumber: registerDto.phoneNumber },
        ],
      });
      console.log('Existing user check:', existingUser);

      if (existingUser) {
        console.warn('User already exists:', registerDto.email);
        throw new UnauthorizedException('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('Password hashed successfully');

      // Create new user
      const user = this.usersRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      console.log('User entity created:', user);

      const savedUser = await this.usersRepository.save(user);
      console.log('User saved to database:', savedUser);

      // Generate JWT token
      const payload = { sub: savedUser.id, email: savedUser.email };
      const token = await this.jwtService.signAsync(payload);
      console.log('JWT token generated successfully');

      return {
        access_token: token,
      };
    } catch (error) {
      console.error('Error during registration:', error.message);
      throw error;
    }
  }

  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    // Find user
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      console.warn('Login failed: user not found for email', loginDto.email);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      console.warn('Login failed: invalid password for email', loginDto.email);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    console.log('Login successful for email:', loginDto.email);

    return {
      access_token: token,
    };
  }
}
