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
import { TransferDto } from '../dto/transferDto.dto';
import { DonateDto } from '../dto/donate.dto';

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
  @UseGuards(JwtGuard)
  @Post('transfer')
  async transferFunds(@Req() request, @Body() transferDto: TransferDto) {
    const { phone }: { phone: string; _: any } = request.user;
    return this.transactionsService.transferFunds(transferDto, phone);
  }
  @UseGuards(JwtGuard)
  @Post('transfer')
  async donateFunds(@Req() request, @Body() donateDto: DonateDto) {
    const { phone }: { phone: string; _: any } = request.user;
    return this.transactionsService.donateFunds(donateDto, phone);
  }

  @Get('verify')
  async verifyPayment(@Res() res: Response, @Query() query) {
    return this.transactionsService.verifyPayment(query, res);
  }

  @UseGuards(JwtGuard)
  @Get('records')
  async transactionRecords() {
    return await this.transactionsService.transactionRecord();
  }

  @UseGuards(JwtGuard)
  @Get('stats')
  async statistics() {
    return await this.transactionsService.statistics();
  }
}
