import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal server error';

    response.status(status).json({
      data: false,
      code: status,
      message,
    });
  }
}
