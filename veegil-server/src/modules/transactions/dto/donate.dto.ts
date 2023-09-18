import { IsNotEmpty } from 'class-validator';

export class DonateDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  reason: string;
}
