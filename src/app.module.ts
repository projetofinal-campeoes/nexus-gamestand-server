import { ensureOwnerMiddleware } from './common/middlewares/ensureOwner.middleware';
import { UsersController } from './users/users.controller';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule  {
 /*  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST})
      .forRoutes(UsersController);
    
    consumer
      .apply(ensureAuthMiddleware,ensureOwnerMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST},
        { path: 'user', method: RequestMethod.POST}
      )
      .forRoutes(UsersController)
  } */

}