import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { httpErrors, response } from 'src/common/errors';
import { CreateFormDto } from './dto/createFormDto';

@Injectable()
export class FormBuilderService {
  constructor(
    @Inject('FormBuilderModel') private formBuilderModel: Model<any>,
    @Inject('FormSubmitModel') private formSubmitModel: Model<any>,
  ) {}

  async createForm(formData: CreateFormDto) {
    try {
      const newForm = await this.formBuilderModel.create([formData]);
      return response.single('Created form successfully!', newForm);
    } catch (err) {
      return err;
    }
  }

  async updateForm(formData: CreateFormDto, id: string) {
    try {
      const form = await this.formSubmitModel.findById(id).lean();

      if (!form) {
        httpErrors.notFound('Form not found!');
      }

      await this.formBuilderModel.updateOne({ _id: id }, formData);

      return response.single('Form updated successfully!');
    } catch (err) {
      return err;
    }
  }

  async submitForm(formData: any) {
    try {
      await this.formSubmitModel.create([formData]);
      return response.single('Form submitted successfully!');
    } catch (err) {
      return err;
    }
  }

  async getAllForms() {
    try {
      const forms = await this.formBuilderModel.find();
      return response.list('List of all forms', forms);
    } catch (err) {
      return err;
    }
  }

  async deleteFormById(id: string) {
    try {
      const deleteForm = await this.formBuilderModel.deleteOne({ _id: id });
      if (deleteForm.deletedCount) {
        return response.single('form deleted successfully!');
      } else {
        throw httpErrors.serverError('Something went wrong!');
      }
    } catch (err) {
      return err;
    }
  }

  async getFormById(id: string) {
    try {
      const form = await this.formBuilderModel.findById(id).lean();
      if (!form) {
        throw httpErrors.notFound('Form not found!');
      }
      return response.single('Successfully fetched form', form);
    } catch (err) {
      throw err;
    }
  }
}
