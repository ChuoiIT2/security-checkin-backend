import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { CheckInsService } from './check-ins.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { GetDetailCheckInDto } from './dto/get-detail-check-in.dto';
import { GetManyCheckInDto } from './dto/get-many-check-in.dto';

@Controller('check-ins')
@ApiSecurity('access-token')
@ApiTags('check-ins')
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @UseGuards(AuthGuard)
  @Get('/get-many')
  @ApiOperation({ summary: 'Get many check-ins' })
  @ApiOkResponsePaginated(GetManyCheckInDto)
  findAll(@Query() options: GetPaginatedDto, @Request() req) {
    const userInfo = req.user;
    return this.checkInsService.getAll(options, userInfo);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create check-in' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createCheckInDto: CreateCheckInDto,
  ) {
    const userInfo = req.user;
    return this.checkInsService.create(userInfo, createCheckInDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get check-in by id' })
  @ApiOkResponseCommon(GetDetailCheckInDto)
  getOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.checkInsService.getOne(userInfo, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete check-in by id' })
  @ApiOkResponseCommon(Boolean)
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.checkInsService.remove(userInfo, id);
  }
}
