import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      bufferLogs: true,
      transport: Transport.TCP,
      options: {
        host: process.env.SIGNUP_HOST,
        port: process.env.SIGNUP_PORT,
      }
    }
  );
  app.useLogger(app.get(Logger))
  await app.listen();
}
bootstrap();
