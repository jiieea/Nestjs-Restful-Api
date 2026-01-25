import { ArgumentsHost, Catch, ExceptionFilter, Global } from '@nestjs/common';
import { ZodError } from 'zod';

@Global()
@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = host.switchToHttp().getResponse();
    if (exception instanceof ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      return response.status(400).json({
        code: 400,
        message: exception.message,
        details: exception.issues,
      });
    }
  }
}
