import {
  Body,
  Controller,
  Delete,
  Get,
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
  deleteUserById(@Param() param: any) {
    return this.appService.deleteUserById(param['id']);
  }

  @Put('users/:id')
  updateUser(@Param() param: any, @Body() userData: any) {
    return this.appService.updateUserById(param['id'], userData);
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
