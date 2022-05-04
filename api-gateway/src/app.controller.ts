import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('users/:id')
  deleteUserById(@Param() param: any) {
    return this.appService.deleteUserById(param['id']);
  }

  @Get('users/:id')
  getUserById(@Param() param: any) {
    return this.appService.getUserById(param['id']);
  }

  @Get('users')
  getAllUser() {
    return this.appService.getAllUsers();
  }

  @Post('users')
  createUser(@Body() userData: any) {
    return this.appService.createUser(userData);
  }
}
