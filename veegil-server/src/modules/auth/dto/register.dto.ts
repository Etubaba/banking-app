import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  phone: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  password: string;
}
