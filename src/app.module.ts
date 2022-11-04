import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './routes/users/users.controller';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './routes/auth/auth.module';
import { CustomGamesModule } from './routes/custom_games/custom_games.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CustomGamesModule],
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
        { path: 'users/:id', method: RequestMethod.GET },
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
