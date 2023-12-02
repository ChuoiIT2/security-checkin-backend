import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDto,
    description: 'Login success',
  })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: RegisterResponseDto,
    description: 'Register success',
  })
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}