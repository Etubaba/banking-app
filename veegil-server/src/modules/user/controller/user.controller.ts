import {
  Controller,
  Delete,
  Get,
  Req,
  UseGuards,
  Param,
  Body,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/role.enum';
import { UpdateUserDto } from '../dto/updateuser.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { RolesGuard } from 'src/common/guard/roles.guard';

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
  @Get('all')
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Delete('deactivate/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  @UseInterceptors(FilesInterceptor('avatar'))
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFiles() file: Array<Express.Multer.File> | undefined,
  ) {
    return await this.userService.updateUser(file, updateUserDto, id);
  }
}
