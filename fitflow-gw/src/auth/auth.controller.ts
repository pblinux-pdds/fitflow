import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('SIGNUP_SERVICE') private signupClient: ClientProxy
    ) {}

    @Post('register')
    async createUser(@Body() data: { email: string, password: string, firstName: string, lastName: string }, @Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'auth_register' }, { data, correlationId: request.id, }));
    }
    
    @Post('login')
    async login(@Body() data: { email: string, password: string }, @Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'auth_login' }, { data, correlationId: request.id, }));
    }
}
