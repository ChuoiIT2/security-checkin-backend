import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseCommon,
  ApiOkResponsePaginated,
} from 'src/common/common-swagger-response.dto';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { CreateLocationDto } from './dto/create-location.dto';
import { GetAllLocationDto } from './dto/get-all-location.dto';
import { GetDetailLocationDto } from './dto/get-detail-location.dto';
import { LocationsService } from './location.service';

@Controller('location')
@ApiTags('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('/get-all')
  @ApiOkResponsePaginated(GetAllLocationDto)
  async getAll(@Query() options: GetPaginatedDto) {
    return await this.locationsService.getAll(options);
  }

  @Post('/create')
  @ApiOkResponseCommon(Boolean)
  async create(@Body(new ValidationPipe()) newLocation: CreateLocationDto) {
    return await this.locationsService.create(newLocation);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one location' })
  @ApiOkResponseCommon(GetDetailLocationDto)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one location' })
  @ApiOkResponseCommon(Boolean)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.remove(id);
  }
}
