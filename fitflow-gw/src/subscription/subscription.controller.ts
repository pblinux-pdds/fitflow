import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom } from 'rxjs';

@Controller('subscription')
export class SubscriptionController {
    constructor(
        @Inject('SUBSCRIPTION_SERVICE') private subscriptionClient: ClientProxy
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createSubscription(@Body() data: { userId: number; plan: string }, @Req() request) {
        return firstValueFrom(this.subscriptionClient.send({ cmd: 'create_subscription' }, { ...data, correlationId: request.id, }));
    }
}
