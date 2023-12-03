import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './location.service';

@Controller('location')
@ApiTags('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all location' })
  async getAll(@Query() options: GetPaginatedDto) {
    return await this.locationsService.getAll(options);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create location success',
  })
  async create(@Body(new ValidationPipe()) newLocation: CreateLocationDto) {
    return await this.locationsService.create(newLocation);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one location success',
  })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete one location success',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.remove(id);
  }
}
