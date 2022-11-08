import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class ensureAuthMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new UnauthorizedException('Invalid Token');
        }

        if (!decoded) {
          throw new UnauthorizedException('Invalid Token');
        }

        req.user = { id: decoded.sub, email: decoded.email };

        return next();
      },
    );
  }
}
