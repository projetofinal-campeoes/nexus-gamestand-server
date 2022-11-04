import { ensureOwnerMiddleware } from './common/middlewares/ensureOwner.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { CustomGamesController } from './custom_games/custom_games.controller';
import { CustomGamesModule } from './custom_games/custom_games.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CustomGamesModule],
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
      .forRoutes(UsersController, CustomGamesController);

    /*  consumer
      .apply(ensureAuthMiddleware,ensureOwnerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST},
        { path: 'users', method: RequestMethod.POST}
      )
      .forRoutes(UsersController) */
  }
}
