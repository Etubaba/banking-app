import { Module } from '@nestjs/common';
import { PaystackService } from './service/paystack.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PaystackService],
})
export class PaystackModule {}
