import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      port: 3001
    }
  });
  await app.listen();
}
bootstrap();
