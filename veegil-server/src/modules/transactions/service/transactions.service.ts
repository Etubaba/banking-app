import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { WithdrawFundsDto } from '../dto/withdrawfund.dto';
import { PaystackService } from '../../payment/service/paystack.service';
import { FundBalanceDto } from '../dto/fundbalance.dto';
import { HttpService } from '@nestjs/axios';
import configuration from '../../../../configs';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paystackService: PaystackService,
    private readonly httpService: HttpService,
  ) {}

  async withdrawFunds(withdrawFundsDto: WithdrawFundsDto, phone: string) {
    const { amount } = withdrawFundsDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    //check if user account balance is sufficient for the transaction
    if (user.account_balance < amount) {
      throw new NotAcceptableException(
        'Insufficient fund to perform this transaction',
      );
    }

    //deduct the expected price from user account balance and update

    const newAmount = user.account_balance - amount;
    await this.prismaService.user.update({
      where: { phone: phone },
      data: {
        account_balance: newAmount,
      },
    });

    //call helper function that calls third party that credits the user directly but since this was
    //wasn't required in this assessment it is just a dummy action

    // create record for this transaction

    await this.prismaService.transaction_history.create({
      data: {
        amount: amount,
        transaction_type: 'debit',
        beneficial_id: user.id,
      },
    });

    return {
      transaction_status: 'completed',
      message: `You have successfully withdrew ${amount}`,
    };
  }

  async fundUserAccount(fundBalanceDto: FundBalanceDto, phone: string) {
    const { amount } = fundBalanceDto;
    //get user details
    const user = await this.prismaService.user.findUnique({
      where: {
        phone: phone,
      },
    });

    const email = user.email;
    return await this.paystackService.initializeTransaction(email, amount);
  }

  async verifyPayment(
    query: { trxref: string; reference: string },
    res: Response,
  ) {
    try {
      const { reference } = query;

      //get the user with this reference

      const transaction_reference =
        await this.prismaService.transaction_reference.findUnique({
          where: {
            reference,
          },
        });

      const user = await this.prismaService.user.findUnique({
        where: {
          email: transaction_reference.email,
        },
      });

      //verify the referense

      const url = `${configuration().payment.paystack_verify_url}${reference}`;
      const headers = {
        Authorization: `Bearer ${configuration().paystack.secretKey}`,
        'Cache-Control': 'no-cache',
      };
      const { data } = await this.httpService.get(url, { headers }).toPromise();
      if (data?.data?.status === 'success') {
        //update user account balance and create transaction record

        await this.prismaService.user.update({
          where: {
            email: user.email,
          },
          data: {
            account_balance: user.account_balance + Number(data.data.amount),
          },
        });

        await this.prismaService.transaction_history.create({
          data: {
            amount: +data?.data?.amount,
            transaction_type: 'credit',
            beneficial_id: user.id,
          },
        });
        try {
          const filePath = path.join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            'public',
            'success.html',
          );
          const htmlContent = await fs.promises.readFile(filePath, 'utf8');

          res.setHeader('Content-Type', 'text/html');
          return res.send(htmlContent);
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      //   console.log(err.response.data);
    }
  }
}
