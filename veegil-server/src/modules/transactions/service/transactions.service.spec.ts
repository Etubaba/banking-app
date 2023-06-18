import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { PaystackService } from '../../payment/service/paystack.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { NotAcceptableException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import configuration from '../../../../configs';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prismaService: PrismaService;
  let paystackService: PaystackService;
  let httpService: HttpService;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TransactionsService, PrismaService, PaystackService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    paystackService = module.get<PaystackService>(PaystackService);
    httpService = module.get<HttpService>(HttpService);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    phone: '123234333',
    full_name: 'Geooeoe',
    account_balance: 500,
    password: '12345',
  };

  // describe('withdrawFunds', () => {
  //   it('should deduct the amount from user account balance and create a transaction record', async () => {
  //     const mockWithdrawFundsDto = { amount: 100 };
  //     const mockPhone = '1234567890';

  //     jest
  //       .spyOn(prismaService.user, 'findUnique')
  //       .mockResolvedValueOnce(mockUser);
  //     jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce(null);
  //     jest
  //       .spyOn(prismaService.transaction_history, 'create')
  //       .mockResolvedValueOnce(null);

  //     const result = await service.withdrawFunds(
  //       mockWithdrawFundsDto,
  //       mockPhone,
  //     );

  //     expect(prismaService.user.findUnique).toHaveBeenCalledWith({
  //       where: { phone: mockPhone },
  //     });
  //     expect(prismaService.user.update).toHaveBeenCalledWith({
  //       where: { phone: mockPhone },
  //       data: { account_balance: 400 },
  //     });
  //     expect(prismaService.transaction_history.create).toHaveBeenCalledWith({
  //       data: {
  //         amount: mockWithdrawFundsDto.amount,
  //         transaction_type: 'debit',
  //         beneficial_id: mockUser.id,
  //       },
  //     });
  //     expect(result).toEqual({
  //       transaction_status: 'completed',
  //       message: `You have successfully withdrew ${mockWithdrawFundsDto.amount}`,
  //     });
  //   });

  //   it('should throw a NotAcceptableException if user account balance is insufficient', () => {
  //     const mockWithdrawFundsDto = { amount: 100 };
  //     const mockPhone = '1234567890';
  //     jest
  //       .spyOn(prismaService.user, 'findUnique')
  //       .mockResolvedValueOnce(mockUser);

  //     expect(
  //       service.withdrawFunds(mockWithdrawFundsDto, mockPhone),
  //     ).rejects.toThrowError(NotAcceptableException);
  //   });
  // });

  // describe('fundUserAccount', () => {
  //   it('should return the result of initializeTransaction from PaystackService', async () => {
  //     const mockFundBalanceDto = { amount: 200 };
  //     const mockPhone = '1234567890';

  //     const mockTransactionResult = {
  //       transaction_status: 'completed',
  //       message: 'Payment successful',
  //     };

  //     jest
  //       .spyOn(prismaService.user, 'findUnique')
  //       .mockResolvedValueOnce(mockUser);
  //     jest
  //       .spyOn(paystackService, 'initializeTransaction')
  //       .mockResolvedValueOnce(mockTransactionResult);

  //     const result = await service.fundUserAccount(
  //       mockFundBalanceDto,
  //       mockPhone,
  //     );

  //     expect(prismaService.user.findUnique).toHaveBeenCalledWith({
  //       where: { phone: mockPhone },
  //     });
  //     expect(paystackService.initializeTransaction).toHaveBeenCalledWith(
  //       mockUser.email,
  //       mockFundBalanceDto.amount,
  //     );
  //     expect(result).toEqual(mockTransactionResult);
  //   });
  // });

  describe('verifyPayment', () => {
    it('should verify payment and update user account balance when payment status is "success"', async () => {
      // Mock the necessary dependencies
      const query = {
        trxref: 'transaction_reference',
        reference: 'paystack_reference',
      };
      const response = {
        data: {
          data: {
            status: 'success',
            amount: 1000,
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        //@ts-ignore
        config: {},
      };

      jest
        .spyOn(prismaService.transaction_reference, 'findUnique')
        .mockResolvedValueOnce({
          id: 'test-id',
          email: 'test@example.com',
          reference: query.reference,
        });
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUser);
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(response) as never);
      jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce({} as any);
      jest
        .spyOn(prismaService.transaction_history, 'create')
        .mockResolvedValueOnce({} as any);

      const res = {
        setHeader: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await transactionsService.verifyPayment(query, res);

      expect(
        prismaService.transaction_reference.findUnique,
      ).toHaveBeenCalledWith({
        where: {
          reference: query.reference,
        },
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: mockUser.email,
        },
      });
      expect(httpService.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
      );
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          email: mockUser.email,
        },
        data: {
          //@ts-ignore
          account_balance:
            mockUser.account_balance + Number(response.data.data.amount),
        },
      });
      expect(prismaService.transaction_history.create).toHaveBeenCalledWith({
        data: {
          //@ts-ignore
          amount: response.data.data.amount,
          transaction_type: 'credit',
          beneficial_id: mockUser.id,
        },
      });
    });
  });
});
