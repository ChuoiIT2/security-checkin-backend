import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseCommon,
  ApiOkResponsePaginated,
} from 'src/common/common-swagger-response.dto';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { GetAllLocationDto } from './dto/get-all-location.dto';
import { GetDetailLocationDto } from './dto/get-detail-location.dto';
import { LocationsService } from './location.service';

@Controller('location')
@ApiSecurity('access-token')
@ApiTags('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @UseGuards(AuthGuard)
  @Get('/get-all')
  @ApiOkResponsePaginated(GetAllLocationDto)
  async getAll(@Query() options: GetPaginatedDto) {
    return await this.locationsService.getAll(options);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOkResponseCommon(Boolean)
  async create(
    @Request() req,
    @Body(new ValidationPipe()) newLocation: CreateLocationDto,
  ) {
    const userInfo = req.user;
    return await this.locationsService.create(userInfo, newLocation);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get one location' })
  @ApiOkResponseCommon(GetDetailLocationDto)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update one location' })
  @ApiOkResponseCommon(Boolean)
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateLocationDto: CreateLocationDto,
  ) {
    const userInfo = req.user;
    return await this.locationsService.update(userInfo, id, updateLocationDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one location' })
  @ApiOkResponseCommon(Boolean)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.remove(id);
  }
}
