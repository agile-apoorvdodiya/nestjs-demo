import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserMiddleware } from 'middlewares/user.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../src/strategies/jwt.strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    MulterModule.register({
      dest: 'uploads',
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret from env',
    }),
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(AppController);
  }
}
