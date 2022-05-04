import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  async deleteUserById(id: string) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_delete_by_id', id),
    );
    return this.getFormattedResponse(response);
  }

  async updateUserById(id: string, data: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_update_by_id', { id, ...data }),
    );
    return this.getFormattedResponse(response);
  }

  async getUserById(id: string) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', id),
    );
    return this.getFormattedResponse(response);
  }

  async getAllUsers() {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_get_all', {}),
    );
    return this.getFormattedResponse(response);
  }

  async createUser(userData: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_create', userData),
    );
    return this.getFormattedResponse(response);
  }

  getFormattedResponse(response: any) {
    if (response?.error) {
      throw new HttpException(
        {
          ...response,
        },
        response.status || 500,
      );
    }
    return response;
  }
}
