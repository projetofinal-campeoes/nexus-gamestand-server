import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { ensureOwnerMiddleware } from './common/middlewares/ensureOwner.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { CustomGamesController } from './routes/custom_games/custom_games.controller';
import { CustomGamesModule } from './routes/custom_games/custom_games.module';
import { FriendsController } from './routes/friends/friends.controller';
import { FriendsModule } from './routes/friends/friends.module';
import { LoginModule } from './routes/login/login.module';
import { PromotionsModule } from './routes/promotions/promotions.module';
import { UsersController } from './routes/users/users.controller';
import { UsersModule } from './routes/users/users.module';
import { BugReportModule } from './routes/bug-report/bug-report.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LoginModule,
    CustomGamesModule,
    FriendsModule,
    PromotionsModule,
    BugReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(UsersController);

    consumer
      .apply(ensureAuthMiddleware)
      .forRoutes(FriendsController, CustomGamesController);
  }
}
