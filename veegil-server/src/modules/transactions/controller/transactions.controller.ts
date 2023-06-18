import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { TransactionsService } from '../service/transactions.service';
import { FundBalanceDto } from '../dto/fundbalance.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { WithdrawFundsDto } from '../dto/withdrawfund.dto';
import { Response, Request } from 'express';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtGuard)
  @Post('payment')
  async makePayment(@Req() request, @Body() fundbalanceDto: FundBalanceDto) {
    const { phone }: { phone: string; _: any } = request.user;

    return await this.transactionsService.fundUserAccount(
      fundbalanceDto,
      phone,
    );
  }

  @UseGuards(JwtGuard)
  @Post('withdraw')
  async withdrawFunds(
    @Req() request,
    @Body() withdrawFundsDto: WithdrawFundsDto,
  ) {
    const { phone }: { phone: string; _: any } = request.user;
    return this.transactionsService.withdrawFunds(withdrawFundsDto, phone);
  }

  @Get('verify')
  async verifyPayment(@Res() res: Response, @Query() query) {
    return this.transactionsService.verifyPayment(query, res);
  }
}
