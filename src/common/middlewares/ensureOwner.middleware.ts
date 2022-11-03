import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ensureOwnerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const { id } = req.user;

    if (id !== req.params.id) {
      throw new UnauthorizedException('Missing Owner permissions');
    }

    return next();
  }
}
