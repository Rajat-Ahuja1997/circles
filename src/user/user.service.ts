import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {} 

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with ID '${id}' not found`);      
    }
    return found;
  }
}
