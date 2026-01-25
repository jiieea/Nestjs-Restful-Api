import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  use(req: any, res: any, next: () => void) {
    this.logger.info(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      `Incoming request from ${req.url} with ${req.method} method `,
    );
    next();
  }
}
