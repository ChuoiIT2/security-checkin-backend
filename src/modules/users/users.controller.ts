import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseCommon,
  ApiOkResponsePaginated,
} from 'src/common/common-swagger-response.dto';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { AuthGuard } from '../auth/guards/auth.guard';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiSecurity('access-token')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get('/get-all')
  @ApiOkResponsePaginated(GetAllUserDto)
  findAll(@Request() req: any, @Query() options: GetPaginatedDto) {
    return this.usersService.findAll(req.user, options);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get me' })
  @Get('/get-me')
  @ApiOkResponseCommon(GetDetailUserDto)
  getMe(@Request() req: any) {
    const userInfo = req.user;
    return this.usersService.findOne(userInfo, req.user.id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  @ApiOkResponseCommon(GetDetailUserDto)
  findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.usersService.findOne(userInfo, id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  @ApiOkResponseCommon(Boolean)
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.usersService.remove(userInfo, id);
  }
}
