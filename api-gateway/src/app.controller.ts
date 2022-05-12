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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { ErrorResponseDto } from './dto/errorResponseDto';
import { SuccessResponseDto } from './dto/successResponseDto';
import { UserRequestDto } from './dto/userDto';
import { LoginDto } from './dto/loginDto';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiParam({ name: 'id', type: String })
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

  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UserRequestDto })
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

  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String })
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

  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUser() {
    const users = await this.appService.getAllUser();
    return {
      success: true,
      users,
    };
  }

  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
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

  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @Post('users/login')
  @ApiBody({ type: LoginDto })
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
      message: 'user logged in successfully',
      user,
    };
  }
}
