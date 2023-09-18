import { IsNotEmpty } from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  target_acct: string;
}
