import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ensurePromoOwnerMiddleware implements NestMiddleware {
  
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const userId = req.user?.id;
    const { id: promoId } = req.params;

    const promotion = await this.prisma.promotions.findFirst({
        where: {
            id: promoId
        }
    })

    if (userId !== promotion?.userId) {
      throw new UnauthorizedException('Missing Owner permissions');
    }

    return next();
  }
}
