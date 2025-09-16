import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const correlationId = req.id ?? req.headers['x-correlation-id'];
    if (correlationId) {
      res.setHeader('x-correlation-id', correlationId);
    }
    next();
  }
}
