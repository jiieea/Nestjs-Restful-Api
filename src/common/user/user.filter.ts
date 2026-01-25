import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

@Catch(ZodType, HttpException)
export class UserFilter implements ExceptionFilter {
  catch(exception: ZodType, host: ArgumentsHost): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        errors: 'Validation failed',
      });
    } else {
      response.status(500).json({
        errors: 'Internal Server Error',
      });
    }
  }
}
