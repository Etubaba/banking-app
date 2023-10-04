import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/services/prisma.service';
import { UpdateUserDto } from '../dto/updateuser.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  async updateUser(
    file: Array<Express.Multer.File> | undefined,
    updateUserDto: UpdateUserDto,
    id: string,
  ) {
    const { email, full_name } = updateUserDto;

    //does user exist
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

    const cloudinaryResponse = await this.cloudinaryService.uploadSingleImage(
      file,
      'zeewallet',
    );

    const newUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        avatar: cloudinaryResponse.secure_url,
        email,
        full_name,
      },
    });

    return {
      status: true,
      user: newUser,
      message: 'User updated successfuly',
    };
  }

  async deleteUser(id: string) {
    return { msg: 'It worked' };
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

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({});

    return { status: true, data: users };
  }
}
