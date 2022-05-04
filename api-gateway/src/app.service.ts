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

  async updateUserById(id: string, data: any) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_update_by_id', { id, ...data }),
    );
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

  async getUserById(id: string) {
    const response = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', id),
    );
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

  getAllUsers() {
    return this.userServiceClient.send('user_get_all', {});
  }

  createUser(userData: any) {
    return this.userServiceClient.send('user_create', userData);
  }
}
