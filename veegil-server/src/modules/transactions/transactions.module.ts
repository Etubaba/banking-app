import { Module } from '@nestjs/common';
import { TransactionsController } from './controller/transactions.controller';
import { TransactionsService } from './service/transactions.service';
import { PaystackService } from '../payment/service/paystack.service';
import { HttpModule, HttpService } from '@nestjs/axios';
// import { PaystackModule } from '../payment/paystack.module';

@Module({
  controllers: [TransactionsController],
  imports: [
    HttpModule,
    //  PaystackModule
  ],
  providers: [TransactionsService, PaystackService],
})
export class TransactionsModule {}
