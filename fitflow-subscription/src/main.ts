import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SUBSCRIPTION_HOST,
        port: process.env.SUBSCRIPTION_PORT,
      }
    }
  );
  await app.listen();
}
bootstrap();
