import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers() {
    return this.userServiceClient.send('user_get_all', {});
  }

  createUser(userData: any) {
    return this.userServiceClient.send('user_create', userData);
  }
}
