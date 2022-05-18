import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private http: HttpService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const response: any = await firstValueFrom(
        this.http.get(
          `${process.env.USER_SERVICE_URL}/users/${req.params['id']}`,
          {
            headers: {
              authorization: req.headers['authorization'],
            },
          },
        ),
      );
    } catch (err) {
      throw new HttpException(
        {
          data: err?.response?.data,
          message: err?.response?.statusText || '',
          status: err?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        },
        err?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    next();
  }
}
