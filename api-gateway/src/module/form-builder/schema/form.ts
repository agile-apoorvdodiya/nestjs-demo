import { Schema } from 'mongoose';

const formControlsSchema = new Schema({
  label: String,
  name: String,
  type: String,
  labelView: String,
  placeholder: String,
  controls: [
    {
      label: String,
      value: String,
    },
  ],
});

export const FormBuilderSchema = new Schema(
  {
    title: String,
    form: [formControlsSchema],
  },
  {
    collection: 'form-builder',
  },
);

export const FormSubmissionSchema = new Schema(
  {
    id: String,
    title: String,
    form: [Schema.Types.Mixed]
  },
  {
    collection: 'form-submissions'
  }
)