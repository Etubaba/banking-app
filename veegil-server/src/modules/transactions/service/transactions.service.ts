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
import { TransferDto } from '../dto/transferDto.dto';
import { DonateDto } from '../dto/donate.dto';

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

  async transferFunds(transferDto: TransferDto, phone: string) {
    const { amount: rawAmount, target_acct } = transferDto;
    //convert to positive int
    const amount = Math.abs(rawAmount);

    //does user exist
    const userGiver = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (!userGiver)
      return {
        status: false,
        message: 'User does not exists',
      };

    //does beneficial exist
    const beneficial = await this.prismaService.user.findUnique({
      where: {
        phone: target_acct,
      },
    });

    if (!beneficial)
      return {
        status: false,
        message: 'Beneficial user does not exists',
      };

    //check for acct balance

    if (userGiver.account_balance < amount) {
      return {
        status: false,
        message: 'Insufficient balance ',
      };
    }

    //minus the amount from userGiver

    await this.prismaService.user.update({
      where: {
        phone,
      },
      data: {
        account_balance: userGiver.account_balance - amount,
      },
    });

    //credit beneficial

    await this.prismaService.user.update({
      where: {
        phone,
      },
      data: {
        account_balance: beneficial.account_balance + amount,
      },
    });

    // records
    await this.prismaService.transaction_history.create({
      data: {
        amount: amount,
        transaction_type: 'debit',
        beneficial_id: beneficial.id,
        sender_id: userGiver.id,
        sender_name: userGiver.full_name,
      },
    });

    return {
      status: true,
      message: 'Transaction completed successfully',
      beneficial: beneficial.full_name,
      amount: amount,
    };
  }

  async donateFunds(donateDto: DonateDto, phone: string) {
    const { amount: rawAmount, reason } = donateDto;
    //convert to positive int
    const amount = Math.abs(rawAmount);

    //does user exist
    const userGiver = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (!userGiver)
      return {
        status: false,
        message: 'User does not exists',
      };

    //check for acct balance

    if (userGiver.account_balance < amount) {
      return {
        status: false,
        message: 'Insufficient balance ',
      };
    }

    //minus the amount from userGiver

    await this.prismaService.user.update({
      where: {
        phone,
      },
      data: {
        account_balance: userGiver.account_balance - amount,
      },
    });

    // records
    await this.prismaService.transaction_history.create({
      data: {
        amount: amount,
        transaction_type: 'debit',
        beneficial_id: userGiver.id,
        sender_id: userGiver.id,
        sender_name: reason,
      },
    });

    return {
      status: true,
      message: `Donted ${amount} for ${reason} successfully.Thank you`,
    };
  }

  async transactionRecord() {
    const transactions = await this.prismaService.transaction_history.findMany(
      {},
    );
    return { status: true, data: transactions };
  }

  async statistics() {
    const users = await this.prismaService.user.count();

    const transactions = await this.prismaService.transaction_history.count();

    const allTransaction =
      await this.prismaService.transaction_history.findMany({});

    const totalAmountInTransaction = allTransaction.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.amount;
      },
      0,
    );

    return {
      status: true,
      total_users: users,
      total_transactions: transactions,
      amount_in_transaction: totalAmountInTransaction,
    };
  }
}
