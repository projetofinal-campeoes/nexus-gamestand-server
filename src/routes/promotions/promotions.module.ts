import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { ensureAuthMiddleware } from '../../common/middlewares/ensureAuth.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { ensurePromoOwnerMiddleware } from './middleware/ensurePromoOwner.middleware';
import { ensurePromoExistsMiddleware } from './middleware/ensurePromoExists.middleware';

@Module({
  controllers: [PromotionsController],
  providers: [PromotionsService, PrismaService]
})
export class PromotionsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ensureAuthMiddleware)
            .forRoutes(PromotionsController);

        consumer
            .apply(ensurePromoOwnerMiddleware)
            .exclude(
                { path: 'promotions', method: RequestMethod.POST },
                { path: 'promotions', method: RequestMethod.GET },
                { path: 'promotions/:id/:rate', method: RequestMethod.POST },
            )
            .forRoutes(PromotionsController);

        consumer
            .apply(ensurePromoExistsMiddleware)
            .exclude(
                { path: 'promotions', method: RequestMethod.POST },
                { path: 'promotions', method: RequestMethod.GET }
            )
            .forRoutes(PromotionsController)
    }
}
