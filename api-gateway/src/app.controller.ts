import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('users/:id')
  async deleteUserById(@Param() param: any) {
    const deletedUser = await this.appService.deleteUserById(param['id']);

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

  @Put('users/:id')
  async updateUserById(@Param() Param: any, @Body() data: any) {
    const editedUser = await this.appService.updateUserById({
      id: Param['id'],
      ...data,
    });

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

  @Get('users/:id')
  async getUserById(@Param() param: any) {
    const user = await this.appService.getUserById(param['id']);

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

  @Get('users')
  async getAllUser() {
    const users = await this.appService.getAllUser();
    return {
      success: true,
      users,
    };
  }

  @Post('users')
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
