import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { UserSchema } from './schema/user';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect('mongodb://localhost:27017/nestjs');
      },
    },
    {
      provide: 'UserModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('UserModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class AppModule {}
