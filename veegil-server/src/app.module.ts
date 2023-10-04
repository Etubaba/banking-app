import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PaystackModule } from './modules/payment/paystack.module';
import { PaystackService } from './modules/payment/service/paystack.service';
import configs from '../configs';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configs], isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    HttpModule,
    TransactionsModule,
    PaystackModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PaystackService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
