import { Body, Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('signup')
export class SignupController {
    constructor(
        @Inject('SIGNUP_SERVICE') private signupClient: ClientProxy
    ) {}

    @Post()
    async createUser(@Body() data: { email: string, password: string, firstName: string, lastName: string }, @Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'create_user' }, { data, correlationId: request.id, }));
    }

    @Get()
    async getUsers(@Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_users' }, { correlationId: request.id }));
    }

    @Get(':id')
    async getUserById(@Param('id') id: string, @Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_user_by_id' }, { id: Number(id), correlationId: request.id } ));
    }
}
