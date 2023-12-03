import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Location } from 'src/entities/location.entity';
import { Repository } from 'typeorm';

import { CreateLocationDto } from './dto/create-location.dto';

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

  async create(createLocationDto: CreateLocationDto) {
    createLocationDto.qrCode = JSON.stringify(createLocationDto);
    const result = await this.locationRepository.save(createLocationDto);

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
