import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    ClientsModule.register([
      {
        name: 'SIGNUP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SIGNUP_HOST,
          port: process.env.SIGNUP_PORT ? parseInt(process.env.SIGNUP_PORT) : 3001,
        }
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
