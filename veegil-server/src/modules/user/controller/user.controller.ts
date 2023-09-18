import {
  Controller,
  Delete,
  Get,
  Req,
  UseGuards,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { UpdateUserDto } from '../dto/updateuser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  async getUserDetails(@Req() request) {
    const { phone }: { phone: string; _: any } = request.user;
    return await this.userService.userDetails(phone);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Delete('deactivate')
  async deleteUser(@Param() id: string) {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(JwtGuard)
  @Patch('update')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Param() id: string) {
    return await this.userService.updateUser(updateUserDto, id);
  }
}
