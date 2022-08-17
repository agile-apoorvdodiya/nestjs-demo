import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { UserSchema } from './schema/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FormBuilderModule } from './module/form-builder/form-builder.module';
import { ConfigModule } from '@nestjs/config';
import { SocketIoGateway } from './socket/socket-io.gateway';
import { SocketModule } from './module/socket/socket.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    SocketModule,
    ConfigModule.forRoot(),
    FormBuilderModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret from env',
      // signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    AppService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'UserModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('UserModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
