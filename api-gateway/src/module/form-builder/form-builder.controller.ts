import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { SubmitFormDto } from 'src/module/form-builder/dto/submit-form';
import { CreateFormDto } from './dto/createFormDto';
import { FormBuilderService } from './form-builder.service';

@ApiBearerAuth()
@ApiTags('form-builder')
@Controller('form-builder')
export class FormBuilderController {
  constructor(private formBuilderService: FormBuilderService) {}

  @Post()
  async createForm(@Body() formData: CreateFormDto) {
    return this.formBuilderService.createForm(formData);
  }

  @Put(':id')
  async updateForm(@Body() formData: CreateFormDto, @Param('id') id: string) {
    return this.formBuilderService.updateForm(formData, id);
  }

  @Post('submit')
  async submitForm(@Body() formData: SubmitFormDto) {
    return this.formBuilderService.submitForm(formData);
  }

  @Get()
  async getAllForm() {
    return this.formBuilderService.getAllForms();
  }

  @Get(':id')
  async getFormById(@Param('id') id: string) {
    return this.formBuilderService.getFormById(id);
  }

  @Delete(':id')
  async deleteFormById(@Param('id') id: string) {
    return this.formBuilderService.deleteFormById(id);
  }
}
