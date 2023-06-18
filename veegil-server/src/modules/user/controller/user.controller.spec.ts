import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { PrismaService } from '../../../database/prisma/services/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUserDetails', () => {
    it('should call the userService.userDetails method with the user phone number from the request', async () => {
      const userDetails = {
        id: 'isisnsnns',
        phone: '1234567890',
        full_name: 'Malvin Co',
        account_balance: 0,
        transaction_history: [],
      };
      const request = {
        user: { phone: '1234567890' },
      };
      userService.userDetails = jest.fn().mockResolvedValueOnce(userDetails);

      const result = await userController.getUserDetails(request);

      expect(userService.userDetails).toHaveBeenCalledWith('1234567890');
      expect(result).toBe(userDetails);
    });
  });
});
