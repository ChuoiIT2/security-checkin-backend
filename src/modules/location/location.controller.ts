import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateLocationDto,
    description: 'Create location success',
  })
  async create(@Body(new ValidationPipe()) newLocation: CreateLocationDto) {
    return await this.locationService.create(newLocation);
  }
}
