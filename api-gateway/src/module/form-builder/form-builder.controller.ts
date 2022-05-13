import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dto/errorResponseDto';
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
  createForm(@Body() formData: any) {
    if (
      !formData ||
      !formData.title ||
      !formData.form ||
      !formData.form.label ||
      !formData.form.type
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
    return this.formBuilderService.createForm(formData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @Get()
  getAllForm() {
    return this.formBuilderService.getAllForms();
  }
}
