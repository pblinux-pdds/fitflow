import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubscriptionController } from './subscription/subscription.controller';
import { SignupController } from './signup/signup.controller';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { CorrelationMiddleware } from './correlation/correlation.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
        genReqId: (request) => request.headers['x-correlation-id'] || uuid(),
        customProps: (request) => ({
          correlationId: request.id,
          service: 'fitflow-api-gateway'
        })
      }
    }),
    ClientsModule.register([
      {
        name: 'SIGNUP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SIGNUP_HOST,
          port: process.env.SIGNUP_PORT ? parseInt(process.env.SIGNUP_PORT) : 3001,
        }
      },
      {
        name: 'SUBSCRIPTION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SUBSCRIPTION_HOST,
          port: process.env.SUBSCRIPTION_PORT ? parseInt(process.env.SUBSCRIPTION_PORT) : 3002,
        }
      },
    ]),
    HealthModule
  ],
  controllers: [AppController, SubscriptionController, SignupController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
