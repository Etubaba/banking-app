import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import configuration from '../../../../configs';
import { PrismaService } from '../../../database/prisma/services/prisma.service';

@Injectable()
export class PaystackService {
  constructor(
    private httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async initializeTransaction(email: string, amount: number): Promise<any> {
    try {
      const url = configuration().payment.Paystack_initialize_url;
      const fields = {
        email,
        amount: String(amount),
        callback_url: configuration().payment.verify_callback_url,
      };

      const headers = {
        Authorization: `Bearer ${configuration().paystack.secretKey}`,
        'Cache-Control': 'no-cache',
      };

      const { data } = await this.httpService
        .post(url, fields, { headers })
        .toPromise();

      if (data) {
        await this.prismaService.transaction_reference.create({
          data: {
            email,
            reference: data.data.reference,
          },
        });
      }
      return data;
    } catch (err) {
      console.log(err.message);
      // throw new BadRequestException(
      //   `Failed to initialize transaction because: ${err.message}`,
      // );
    }
  }
}
