import { Body, Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(
        @Inject('SIGNUP_SERVICE') private signupClient: ClientProxy
    ) {}    

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers(@Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_users' }, { correlationId: request.id }));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUserById(@Param('id') id: string, @Req() request) {
        return firstValueFrom(this.signupClient.send({ cmd: 'get_user_by_id' }, { id: Number(id), correlationId: request.id } ));
    }
}
