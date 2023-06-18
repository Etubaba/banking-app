import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  // @Transform(({ value }) => String(value))
  phone: string;
  @IsNotEmpty()
  @IsString()
  // @Transform(({ value }) => String(value))
  password: string;
}
