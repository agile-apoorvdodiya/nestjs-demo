import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { inspect } from 'util';
@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    throw new HttpException(
      {
        context: context['headers'],
        status: 400,
        message: 'token not found',
      },
      HttpStatus.BAD_REQUEST,
    );
    return next.handle();
  }
}
