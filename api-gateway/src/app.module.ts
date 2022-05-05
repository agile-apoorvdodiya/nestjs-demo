import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { UserSchema } from './schema/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret from env',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
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
