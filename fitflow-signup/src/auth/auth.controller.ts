import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_register' })
  register(
    @Payload() payload: { data: CreateUserDto, correlationId?: string },
  ) {
    return this.authService.register(payload.data, payload.correlationId);
  }

  @MessagePattern({ cmd: 'auth_login' })
  login(
    @Payload() payload: { data: LoginDto, correlationId?: string },
  ) {
    return this.authService.login(payload.data, payload.correlationId);
  }
}
