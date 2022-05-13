import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FormBuilderService {
  constructor(
    @Inject('FormBuilderModel') private formBuilderModel: Model<any>,
    @Inject('FormSubmitModel') private formSubmitModel: Model<any>,
  ) {}

  async createForm(formData: any) {
    try {
      const form = await this.formBuilderModel.create([formData]);
      return form;
    } catch (err) {
      return err;
    }
  }

  async submitForm(formData: any) {
    try {
      const form = await this.formSubmitModel.create([formData]);
      return form;
    } catch (err) {
      return err;
    }
  }

  async getAllForms() {
    try {
      const forms = await this.formBuilderModel.find();
      return forms;
    } catch (err) {
      return err;
    }
  }

  async deleteFormById(id: string) {
    try {
      const deleteForm = await this.formBuilderModel.deleteOne({ _id: id });
      return deleteForm;
    } catch (err) {
      return err;
    }
  }
  
  async getFormById(id: string) {
    try {
      const form = await this.formBuilderModel.findById(id);
      return form;
    } catch (err) {
      return err;
    }
  }
}
