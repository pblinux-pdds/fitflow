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
        host: process.env.SUBSCRIPTION_HOST,
        port: process.env.SUBSCRIPTION_PORT,
      }
    }
  );
  app.useLogger(app.get(Logger))
  await app.listen();
}
bootstrap();
