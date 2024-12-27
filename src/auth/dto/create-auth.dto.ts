import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Matches, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least 8 characters, one letter, and one number',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsBoolean()
  @IsNotEmpty()
  termsAccepted: boolean;
}