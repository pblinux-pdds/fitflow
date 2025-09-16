import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
  ) {}

  create(createUserDto: CreateUserDto, correlationId?: string) {
    this.logger.info({ correlationId }, 'Creating new user');
    return this.repository.save(createUserDto)
  }

  findAll(correlationId?: string) {
    this.logger.info({ correlationId }, 'Getting all user');
    return this.repository.find();
  }

  findOne(id: number, correlationId?: string) {
    this.logger.info({ correlationId }, 'Getting all user');
    return this.repository.findOneBy({ id });
  }
}
