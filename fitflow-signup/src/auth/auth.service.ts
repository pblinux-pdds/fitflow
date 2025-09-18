import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto, correlationId?: string) {
        const user = await this.userService.create(createUserDto, correlationId);
        return user;
    }

    async login(loginDto: LoginDto, correlationId?: string) {
        const user = await this.userService.login(loginDto.email, loginDto.password, correlationId);
        if (!user) {
            console.warn(`[${correlationId}] Login failed`);
            return null;
        }

        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
}
