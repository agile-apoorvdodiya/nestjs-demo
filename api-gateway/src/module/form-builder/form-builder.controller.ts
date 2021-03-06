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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dto/errorResponseDto';
import { SubmitFormDto } from 'src/module/form-builder/dto/submit-form';
import { SuccessResponseDto } from 'src/dto/successResponseDto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { CreateFormDto } from './dto/createFormDto';
import { FormBuilderService } from './form-builder.service';

@ApiHeader({
  name: 'authorization',
  description: 'jwt token for authorization',
})
@Controller('form-builder')
export class FormBuilderController {
  constructor(private formBuilderService: FormBuilderService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateFormDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post()
  async createForm(@Body() formData: any) {
    if (
      !formData ||
      !formData.title ||
      !formData.form ||
      !formData.form.length
    ) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          error: 'Insufficient data',
          message: 'Please provide all fields',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const form = await this.formBuilderService.createForm(formData);
    return {
      form,
      success: true,
      message: 'successfully created form',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateFormDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Put(':id')
  async updateForm(@Body() formData: any, @Param() param: any) {
    if (
      !formData ||
      !formData.title ||
      !formData.form ||
      !formData.form.length
    ) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          error: 'Insufficient data',
          message: 'Please provide all fields',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const form = await this.formBuilderService.updateForm(
      formData,
      param['id'],
    );
    if (form.modifiedCount === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: 'form not found',
          error: 'not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      form,
      success: true,
      message: 'successfully created form',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SubmitFormDto })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('submit')
  async submitForm(@Body() formData: any) {
    if (!formData || !formData.id || !formData.title || !formData.form) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          error: 'Insufficient data',
          message: 'Please provide all fields',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const form = await this.formBuilderService.submitForm(formData);
    return {
      form,
      success: true,
      message: 'successfully created form',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @Get()
  async getAllForm() {
    const forms = await this.formBuilderService.getAllForms();
    return {
      forms,
      success: true,
      message: 'Successfully fetched forms',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @Get(':id')
  async getFormById(@Param() param: any) {
    const form = await this.formBuilderService.getFormById(param['id']);
    return {
      form,
      success: true,
      message: 'Successfully fetched forms',
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Delete(':id')
  async deleteFormById(@Param() param: any) {
    const response = await this.formBuilderService.deleteFormById(param['id']);
    if (response.deletedCount === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: 'form not found',
          error: 'not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      message: 'Successfully deleted form',
    };
  }
}
