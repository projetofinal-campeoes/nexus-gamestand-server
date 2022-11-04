import { ensureOwnerMiddleware } from './common/middlewares/ensureOwner.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware,ensureOwnerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },        
      )
      .forRoutes(UsersController);

    /*  consumer
      .apply(ensureAuthMiddleware,ensureOwnerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST},
        { path: 'users', method: RequestMethod.POST}
      )
      .forRoutes(UsersController) */
  }
}
