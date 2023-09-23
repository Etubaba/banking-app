import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CloudinaryService],
})
export class UserModule {}
