import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() payload: { data: CreateUserDto, correlationId?: string }) {
    return this.userService.create(payload.data, payload.correlationId);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(@Payload() payload: { id: number, correlationId?: string } ) {
    return this.userService.findOne(payload.id, payload.correlationId);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers(@Payload() payload: { correlationId?: string }) {
    return this.userService.findAll(payload.correlationId);
  }
}
