import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.findAll();
  }
}
