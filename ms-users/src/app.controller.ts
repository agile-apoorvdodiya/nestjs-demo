import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('user_get_by_id')
  async getUserById(id: any) {
    const user = await this.appService.getUserById(id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
        message: 'User does not exist!',
      };
    }
    return user;
  }

  @MessagePattern('user_get_all')
  getAllUser() {
    return this.appService.getAllUser();
  }

  @MessagePattern('user_create')
  createUser(userData: any) {
    return this.appService.createUser(userData);
  }
}
