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

    if (!editedUser || editedUser?.upsertedCount === 0) {
      return {
        status: 404,
        error: 'User not found',
        message: 'User does not exist',
        success: false,
      };
    }

    return {
      success: true,
      message: 'user updated successfully',
      user: editedUser,
    };
  }

  @MessagePattern('user_delete_by_id')
  async deleteUserById(id: any) {
    const deletedUser = await this.appService.deleteUserById(id);

    if (deletedUser.deletedCount === 0) {
      return {
        status: 404,
        error: 'user not found',
        message: 'User does not exist',
        success: false,
      };
    }

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  @MessagePattern('user_get_by_id')
  async getUserById(id: any) {
    const user = await this.appService.getUserById(id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
        message: 'User does not exist!',
        success: false,
      };
    }
    return {
      success: true,
      user,
    };
  }

  @MessagePattern('user_get_all')
  async getAllUser() {
    const users = await this.appService.getAllUser();
    return {
      success: true,
      users,
    };
  }

  @MessagePattern('user_create')
  async createUser(userData: any) {
    if (!userData || !userData.name || !userData.email || !userData.contact) {
      return {};
    }
    const user = await this.appService.createUser(userData);
    return {
      success: true,
      message: 'user created successfully',
      user,
    };
  }
}
