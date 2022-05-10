import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async saveDocumentDetails(userId: string, file: any, token: string) {
    let response = null;
    if (file && userId) {
      response = await firstValueFrom(
        this.httpService.put(
          `http://localhost:3000/users/${userId}`,
          {
            document: file.filename,
          },
          {
            headers: {
              authorization: token,
            },
          },
        ),
      );
    }
    return response;
  }
}
