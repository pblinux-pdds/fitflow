import { Controller } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('suscription')
export class SubscriptionController {
  constructor(private readonly suscriptionService: SubscriptionService) {}

  @MessagePattern({ cmd: 'create_subscription' })
  createSubscription(createSuscriptionDto: CreateSubscriptionDto) {
    return this.suscriptionService.create(createSuscriptionDto);
  }
}
