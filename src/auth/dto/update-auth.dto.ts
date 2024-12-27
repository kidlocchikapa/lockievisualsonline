import { IsString, IsEmail, IsOptional, IsPhoneNumber, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one letter, and one number',
  })
  password?: string;

  @IsOptional()
  termsAccepted?: boolean;
}
