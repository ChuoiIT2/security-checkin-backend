import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from 'src/common/role.enum';
import { CheckIn } from 'src/entities/check-in.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { LocationsService } from '../locations/location.service';
import { UsersService } from '../users/users.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';

@Injectable()
export class CheckInsService {
  constructor(
    @InjectRepository(CheckIn)
    private readonly checkInRepository: Repository<CheckIn>,
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
  ) {}

  async getAll(userInfo: User) {
    const checkIns = await this.checkInRepository
      .createQueryBuilder('checkIn')
      .leftJoinAndSelect('checkIn.location', 'location')
      .leftJoinAndSelect('checkIn.user', 'user')
      .select([
        'checkIn.id',
        'checkIn.time',
        'location.id',
        'location.name',
        'location.address',
        'location.latitude',
        'location.longitude',
        'user.id',
        'user.username',
        'user.email',
        'user.phoneNumber',
        'user.name',
      ]);

    if (userInfo.role === ERole.USER) {
      const result = await checkIns
        .where('user.id = :id', { id: userInfo.id })
        .getMany();
      return result;
    } else {
      return await checkIns.getMany();
    }
  }

  async create(userInfo: User, createCheckInDto: CreateCheckInDto) {
    if (
      userInfo.role !== ERole.ADMIN &&
      userInfo.id !== createCheckInDto.userId
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You are not allowed to create check-in for other user',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const userId = createCheckInDto.userId;
    const locationId = createCheckInDto.locationId;

    const user = await this.usersService.findOne(userId);
    const location = await this.locationsService.getOne(locationId);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!location) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Location not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const checkIn = new CheckIn();
    checkIn.user = user;
    checkIn.location = location;
    checkIn.time = new Date();

    const result = await this.checkInRepository.save(checkIn);

    return !!result;
  }

  async getOne(userInfo: User, id: number) {
    const checkIn = this.checkInRepository
      .createQueryBuilder('checkIn')
      .leftJoinAndSelect('checkIn.location', 'location')
      .leftJoinAndSelect('checkIn.user', 'user')
      .where('checkIn.id = :id', { id });

    if (userInfo.role === ERole.USER) {
      const result = await checkIn
        .andWhere('user.id = :userId', {
          userId: userInfo.id,
        })
        .getOne();

      if (!result) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Check-in not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } else {
      return await checkIn.getOne();
    }
  }

  async remove(userInfo: User, id: number) {
    const checkIn = await this.getOne(userInfo, id);

    if (!checkIn) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Check-in not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.checkInRepository.softDelete(checkIn.id);

    return !!result;
  }
}
