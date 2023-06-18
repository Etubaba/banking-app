import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

jest.mock('@nestjs/axios');

describe('PaystackService', () => {
  let paystackService: PaystackService;
  let httpService: HttpService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaystackService, HttpService, PrismaService],
    }).compile();

    paystackService = module.get<PaystackService>(PaystackService);
    httpService = module.get<HttpService>(HttpService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize transaction and save reference when successful', async () => {
    // Mock the necessary dependencies
    const email = 'test@example.com';
    const amount = 1000;
    const reference = 'paystack_reference';
    const response: AxiosResponse<unknown, any> = {
      data: {
        data: {
          reference,
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };

    jest.spyOn(httpService, 'post').mockImplementation(() => of(response));
    jest
      .spyOn(prismaService.transaction_reference, 'create')
      .mockResolvedValueOnce({ id: '', reference: '', email: '' });

    const result = await paystackService.initializeTransaction(email, amount);

    expect(httpService.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.any(Object),
    );
    expect(prismaService.transaction_reference.create).toHaveBeenCalledWith({
      data: {
        email,
        reference,
      },
    });
    expect(result).toBe(response.data);
  });
});
