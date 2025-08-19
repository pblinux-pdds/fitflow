import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('subscription')
export class SubscriptionController {
    constructor(
        @Inject('SUBSCRIPTION_SERVICE') private subscriptionClient: ClientProxy
    ) {}

    @Post()
    async createSubscription(@Body() data: { userId: number; plan: string }) {
        return firstValueFrom(this.subscriptionClient.send({ cmd: 'create_subscription' }, data));
    }
}
