import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@ApiSecurity('access-token')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get me' })
  @Get('/get-me')
  getMe(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
