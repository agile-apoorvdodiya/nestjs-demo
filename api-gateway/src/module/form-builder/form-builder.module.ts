import { Module } from '@nestjs/common';
import { FormBuilderService } from './form-builder.service';
import { FormBuilderController } from './form-builder.controller';
import mongoose from 'mongoose';
import { FormBuilderSchema } from './schema/form';

@Module({
  providers: [
    FormBuilderService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'FormBuilderModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('FormBuilderModel', FormBuilderSchema),
      inject: ['DB_CONNECTION'],
    },
    {
      provide: 'FormSubmitModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('FormSubmitModel', FormBuilderSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
  controllers: [FormBuilderController],
})
export class FormBuilderModule {}
