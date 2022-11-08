import {
    Injectable,
    NestMiddleware,
    NotFoundException
  } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';
  import { PrismaService } from '../../../prisma/prisma.service';
  
  @Injectable()
  export class ensurePromoExistsMiddleware implements NestMiddleware {
    
    constructor(private readonly prisma: PrismaService) {}
  
    async use(req: Request, _: Response, next: NextFunction) {
      const { id: promoId } = req.params;
  
      const promotion = await this.prisma.promotions.findFirst({
          where: {
              id: promoId
          }
      })
  
      if (!promotion) {
        throw new NotFoundException('Promotion not found');
      }
  
      return next();
    }
  }
  