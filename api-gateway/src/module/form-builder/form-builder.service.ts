import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FormBuilderService {
  constructor(
    @Inject('FormBuilderModel') private formBuilderModel: Model<any>,
  ) {}

  async createForm(formData: any) {
    try {
      const form = this.formBuilderModel.create([formData]);
      return form;
    } catch (err) {
      return err;
    }
  }

  async getAllForms() {
    try {
      const forms = this.formBuilderModel.find();
      return forms;
    } catch (err) {
      return err;
    }
  }
}
