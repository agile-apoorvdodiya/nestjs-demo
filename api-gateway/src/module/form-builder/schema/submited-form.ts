import { Schema } from 'mongoose';

export const FormSubmitSchema = new Schema({
  id: String,
  title: String,
  form: [Schema.Types.Mixed]
});