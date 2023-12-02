import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { GetAllUserDto } from './dto/get-all-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<GetAllUserDto[]> {
    const users: GetAllUserDto[] = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.username',
        'user.phoneNumber',
        'user.imageUrl',
        'user.gender',
        'user.dateOfBirth',
        'user.role',
      ])
      .getMany();

    return users;
  }

  async findOne(id: number) {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user');

    const result = await user.getOne();

    if (!result) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
