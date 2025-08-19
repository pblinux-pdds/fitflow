import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('signup')
export class SignupController {
    constructor(
        @Inject('SIGNUP_SERVICE') private signupClient: ClientProxy
    ) {}

    @Post()
    async createUser(@Body() data: { email: string, password: string, firstName: string, lastName: string }) {
        return firstValueFrom(this.signupClient.send({ cmd: 'create_user' }, data));
    }

    @Get()
    async getUsers() {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_users' }, {}));
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_user_by_id' }, Number(id)));
    }
}
