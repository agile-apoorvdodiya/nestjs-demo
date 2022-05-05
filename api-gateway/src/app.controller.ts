import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUserById(@Param() param: any) {
    const deletedUser = await this.appService.deleteUserById(param['id']);

    if (deletedUser.deletedCount === 0) {
      throw new HttpException(
        {
          status: 404,
          error: 'user not found',
          message: 'User does not exist',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  async updateUserById(@Param() Param: any, @Body() data: any) {
    const editedUser = await this.appService.updateUserById({
      id: Param['id'],
      ...data,
    });

    if (!editedUser || editedUser?.upsertedCount === 0) {
      throw new HttpException(
        {
          status: 404,
          error: 'user not found',
          message: 'User does not exist',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      message: 'user updated successfully',
      user: editedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUserById(@Param() param: any) {
    const user = await this.appService.getUserById(param['id']);

    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'user not found',
          message: 'User does not exist',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUser() {
    const users = await this.appService.getAllUser();
    return {
      success: true,
      users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  async createUser(@Body() userData: any) {
    if (!userData || !userData.name || !userData.email || !userData.contact) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          success: false,
          error: 'Insufficient Data',
          message: 'Insufficient Data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.appService.createUser(userData);
    return {
      success: true,
      message: 'user created successfully',
      user,
    };
  }

  @Post('users/login')
  async loginUser(@Body() userData: any) {
    if (!userData || !userData.email || !userData.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          success: false,
          error: 'Insufficient Data',
          message: 'Insufficient Data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.appService.login(userData);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          success: false,
          error: 'Invalid user credentials',
          message: 'Invalid user credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      success: true,
      message: 'user created successfully',
      user,
    };
  }
}
