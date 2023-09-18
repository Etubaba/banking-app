import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  full_name: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  email: string;
}
