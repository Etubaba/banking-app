import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './providers/strategy';
import { PasswordHash } from './providers/helper/password.hash';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtStrategy, PasswordHash, AuthService],
  exports: [AuthService, PasswordHash],
  controllers: [AuthController],
})
export class AuthModule {}
