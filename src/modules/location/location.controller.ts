import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all location' })
  async getAll(@Query() options: GetPaginatedDto) {
    return await this.locationService.getAll(options);
  }

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
