import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '../service/transactions.service';
import { FundBalanceDto } from '../dto/fundbalance.dto';
import { WithdrawFundsDto } from '../dto/withdrawfund.dto';
import { Response } from 'express';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaystackService } from '../../payment/service/paystack.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      imports: [HttpModule],
      providers: [TransactionsService, PrismaService, PaystackService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('makePayment', () => {
    it('should call the fundUserAccount method', async () => {
      const fundbalanceDto: FundBalanceDto = {
        amount: 444,
      };
      const userPhone = '1234567890';
      const mockResponse = {
        status: true,
        message: 'Authorization URL created',
        data: {
          authorization_url: 'https://checkout.paystack.com/j3sflwwlbj66b2z',
          access_code: 'j3sflwwlbj66b2z',
          reference: 'rub2gvd9d4',
        },
      };

      jest
        .spyOn(transactionsService, 'fundUserAccount')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.makePayment(
        { user: { phone: userPhone } },
        fundbalanceDto,
      );

      expect(result).toBe(mockResponse);
      expect(transactionsService.fundUserAccount).toHaveBeenCalledWith(
        fundbalanceDto,
        userPhone,
      );
    });
  });

  describe('withdrawFunds', () => {
    it('should call the withdrawFunds method', async () => {
      const withdrawFundsDto: WithdrawFundsDto = {
        amount: 444,
      };
      const userPhone = '1234567890';
      const mockResponse = {
        transaction_status: 'completed',
        message: `You have successfully withdrew 444`,
      };

      jest
        .spyOn(transactionsService, 'withdrawFunds')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.withdrawFunds(
        { user: { phone: userPhone } },
        withdrawFundsDto,
      );

      expect(result).toBe(mockResponse);
      expect(transactionsService.withdrawFunds).toHaveBeenCalledWith(
        withdrawFundsDto,
        userPhone,
      );
    });
  });

  // afterEach(() => {
  //   jest.resetAllMocks();
  // });
  describe('verifyPayment', () => {
    it('should call verifyPayment in the service and return the HTML page as response', async () => {
      const mockResponse: Partial<Response<any, Record<string, any>>> = {
        send: jest.fn(),
      };
      const mockQuery = { trxref: 'ererer', reference: 'ererer' };
      const mockHtmlContent =
        '<html><body>Payment verification page</body></html>';

      jest
        .spyOn(transactionsService, 'verifyPayment')
        .mockImplementationOnce((query, res) => {
          (res as Response<any, Record<string, any>>).send(mockHtmlContent);
          return Promise.resolve(
            mockResponse as Response<any, Record<string, any>>,
          );
        });

      await controller.verifyPayment(
        mockResponse as Response<any, Record<string, any>>,
        mockQuery,
      );

      expect(mockResponse.send).toHaveBeenCalledWith(mockHtmlContent);
      expect(transactionsService.verifyPayment).toHaveBeenCalledWith(
        mockQuery,
        mockResponse,
      );
    });
  });
});
