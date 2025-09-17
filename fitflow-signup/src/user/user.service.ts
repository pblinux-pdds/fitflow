import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
  ) {}

  async create(createUserDto: CreateUserDto, correlationId?: string) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repository.create({ ...createUserDto, password: hash });

    this.logger.info({ correlationId }, 'Creating new user');
    return this.repository.save(user);
  }

  async login(email: string, password: string, correlationId?: string) {
    const user = await this.repository.findOneBy({ email });
    if (!user) return null;
    
    const isMatch = await bcrypt.compare(password, user.password);
    this.logger.info({ correlationId }, 'Login a user');
    return isMatch ? user : null;
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
