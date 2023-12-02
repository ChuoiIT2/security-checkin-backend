import { Injectable } from '@nestjs/common';
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
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<Location>> {
    const qb = this.locationRepository.createQueryBuilder('location');
    return paginate<Location>(qb, options);
  }

  async create(createLocationDto: CreateLocationDto) {
    createLocationDto.qrCode = JSON.stringify(createLocationDto);
    return await this.locationRepository.save(createLocationDto);
  }
}
