import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FormBuilderService {
  constructor(
    @Inject('FormBuilderModel') private formBuilderModel: Model<any>,
  ) {}

  async createForm(formData: any) {
    try {
      const form = await this.formBuilderModel.create([formData]);
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
}
