import { IsNotEmpty, IsOptional } from 'class-validator';

export class BillDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  bill_type: string;
  @IsNotEmpty()
  provider: string;
  @IsNotEmpty()
  user_credit_id: string;
  @IsOptional()
  tvPackage: string; // for dstv and gotv sub
}
