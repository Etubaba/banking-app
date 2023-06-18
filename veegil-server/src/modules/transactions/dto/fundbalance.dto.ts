import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class FundBalanceDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  amount: number;
}
