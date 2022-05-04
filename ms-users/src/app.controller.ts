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

  @MessagePattern('user_update_by_id')
  async updateUserById(data: any) {
    const editedUser = await this.appService.updateUserById(data);

    console.log(editedUser);

    if (editedUser.upsertedCount === 0) {
      return {
        status: 404,
        error: 'User not found',
        message: 'User does not exist',
      };
    }

    return editedUser;
  }

  @MessagePattern('user_delete_by_id')
  async deleteUserById(id: any) {
    const deletedUser = await this.appService.deleteUserById(id);

    if (deletedUser.deletedCount === 0) {
      return {
        status: 404,
        error: 'User not found',
        message: 'User does not exist',
      };
    }

    return deletedUser;
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
