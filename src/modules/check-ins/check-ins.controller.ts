import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CheckInsService } from './check-ins.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';

@Controller('check-ins')
@ApiSecurity('access-token')
@ApiTags('check-ins')
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create check-in' })
  create(
    @Request() req,
    @Body(new ValidationPipe()) createCheckInDto: CreateCheckInDto,
  ) {
    const userInfo = req.user;
    return this.checkInsService.create(userInfo, createCheckInDto);
  }

  @UseGuards(AuthGuard)
  @Get('/get-many')
  @ApiOperation({ summary: 'Get many check-ins' })
  findAll(@Request() req) {
    const userInfo = req.user;
    return this.checkInsService.getAll(userInfo);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get check-in by id' })
  getOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.checkInsService.getOne(userInfo, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete check-in by id' })
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.checkInsService.remove(userInfo, id);
  }
}
