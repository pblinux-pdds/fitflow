import { Inject, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private repository: Repository<Subscription>,
    @Inject('SIGNUP_SERVICE') private userClient: ClientProxy
  ) {}

  async create(createSuscriptionDto: CreateSubscriptionDto) {
    const command = this.userClient.send({ cmd: 'get_user_by_id' }, createSuscriptionDto.userId);
    const user = await lastValueFrom(command)

    if (!user) {
        throw new Error('User not found');
    }

    return this.repository.save(createSuscriptionDto);
  }
}
