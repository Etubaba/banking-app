import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../../database/prisma/services/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(UserService).toBeDefined();
    expect(PrismaService).toBeDefined();
  });

  it('should return user details with the passed phone number', async () => {
    const phone = '1234567890';
    const user = {
      id: 1,
      full_name: 'John Doe',
      email: 'john@gmail.com',
      phone: '1234567890',
      account_balance: 1000,
      transaction_history: [],
    };
    prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(user);

    const result = await userService.userDetails(phone);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { phone: '1234567890' },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        account_balance: true,
        transaction_history: true,
      },
    });
    expect(result).toEqual(user);
  });
});
