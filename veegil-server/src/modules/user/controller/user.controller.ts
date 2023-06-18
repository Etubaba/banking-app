import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  async getUserDetails(@Req() request) {
    const { phone }: { phone: string; _: any } = request.user;
    return await this.userService.userDetails(phone);
  }
}
