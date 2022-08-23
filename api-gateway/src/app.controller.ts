import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { UserRequestDto } from './dto/userDto';
import { LoginDto } from './dto/loginDto';
import { Public } from './guards/auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUser() {
    return this.appService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createUser(@Body() userData: UserRequestDto) {
    return this.appService.createUser(userData);
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async loginUser(@Body() userData: LoginDto) {
    return this.appService.login(userData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.appService.deleteUserById(id);
  }

  @Put(':id')
  async updateUserById(@Param('id') id: string, @Body() data: UserRequestDto) {
    return this.appService.updateUserById({ id, ...data });
  }
}
