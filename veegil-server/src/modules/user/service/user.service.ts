import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async userDetails(phone: string): Promise<object> {
    const user = await this.prismaService.user.findUnique({
      where: {
        phone: phone,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        account_balance: true,
        transaction_history: true,
      },
    });
    return user;
  }
}
