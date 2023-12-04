import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ERole } from 'src/common/role.enum';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<Location>> {
    const qb = this.locationRepository
      .createQueryBuilder('location')
      .select([
        'location.id',
        'location.name',
        'location.latitude',
        'location.longitude',
        'location.address',
        'location.description',
        'location.qrCode',
      ]);
    return paginate<Location>(qb, options);
  }

  async create(userInfo: User, createLocationDto: CreateLocationDto) {
    if (userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not authorized to create location',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    createLocationDto.qrCode = JSON.stringify(createLocationDto);
    const result = await this.locationRepository.save(createLocationDto);

    return !!result;
  }

  async update(
    userInfo: User,
    id: number,
    updateLocationDto: UpdateLocationDto,
  ) {
    if (userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not authorized to create location',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const location = await this.getOne(id);
    Object.assign(location, updateLocationDto);
    location.qrCode = JSON.stringify({
      id: location.id,
      name: location.name,
      longitude: location.longitude,
      latitude: location.latitude,
      address: location.address,
      description: location.description,
    });

    const result = await this.locationRepository.save(location);

    return !!result;
  }

  async getOne(id: number) {
    const location = this.locationRepository
      .createQueryBuilder('location')
      .where('location.id = :id', { id })
      .select('location');

    const result = await location.getOne();

    if (!result) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Location not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async remove(id: number) {
    const location = await this.getOne(id);
    const result = await this.locationRepository.softDelete(location.id);

    return !!result;
  }
}
