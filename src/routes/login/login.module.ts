import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
  imports: [PrismaModule, ThrottlerModule.forRoot({
    ttl: 30,
    limit: 3
  })],
})
export class LoginModule { }
