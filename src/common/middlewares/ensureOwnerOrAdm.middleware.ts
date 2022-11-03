import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ensureOwnerOrAdmMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const { id } = req.user;

    if (id !== req.params.id) {
      throw new UnauthorizedException('Missing Owner Or Admin permissions');
    }

    return next();
  }
}
