import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { UpdateUserDto } from '../dto/updateuser.dto';

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

  async updateUser(updateUserDto: UpdateUserDto, phone: string) {
    const { avatar, email, full_name } = updateUserDto;

    //does user exist
    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user)
      return {
        status: false,
        message: 'User does not exists',
      };

    await this.prismaService.user.update({
      where: {
        phone,
      },
      data: {
        avatar,
        email,
        full_name,
      },
    });

    return { status: true, message: 'User updated successfuly' };
  }

  async deleteUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return {
        status: false,
        message: 'User does not exists',
      };

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    return { status: false, message: 'User deactivated successfully' };
  }
}
