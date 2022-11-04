import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { ensureOwnerMiddleware } from './common/middlewares/ensureOwner.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { CustomGamesController } from './routes/custom_games/custom_games.controller';
import { CustomGamesModule } from './routes/custom_games/custom_games.module';
import { LoginModule } from './routes/login/login.module';
import { UsersController } from './routes/users/users.controller';
import { UsersModule } from './routes/users/users.module';
import { FriendsModule } from './routes/friends/friends.module';
import { FriendsController } from './routes/friends/friends.controller';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LoginModule,
    CustomGamesModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware, ensureOwnerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(UsersController, CustomGamesController);

    consumer.apply(ensureAuthMiddleware).forRoutes(FriendsController);
    /*  consumer
      .apply(ensureAuthMiddleware,ensureOwnerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST},
        { path: 'users', method: RequestMethod.POST}
      )
      .forRoutes(UsersController) */
  }
}
