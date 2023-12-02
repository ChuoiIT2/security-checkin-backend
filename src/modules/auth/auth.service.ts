import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IAppConfig } from 'src/configs/app.config';
import { IAuthConfig } from 'src/configs/auth.config';
import { ErrorMessages } from 'src/configs/constant.config';

import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email, true);

    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        {
          code: HttpStatus.UNAUTHORIZED,
          message: ErrorMessages.INVALID_CREDENTIALS,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    return {
      accessToken: await this.generateToken(user, loginDto.isRemember),
      user,
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    if (!!(await this.usersService.findWithEmail(registerDto.email))) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ErrorMessages.EMAIL_ALREADY_EXISTS,
        },
        HttpStatus.CONFLICT,
      );
    }

    registerDto.password = bcrypt.hashSync(registerDto.password, 10);
    const newUser = await this.usersService.create(registerDto);

    delete newUser.password;

    return {
      accessToken: await this.generateToken(newUser),
      user: newUser,
    };
  }

  private generateToken(user: any, isLongExpires = false) {
    const plainObject = JSON.parse(JSON.stringify(user));
    return this.jwtService.signAsync(
      {
        ...plainObject,
      },
      {
        expiresIn: isLongExpires
          ? this.configService.get('jwtLongExpiresIn')
          : this.configService.get('jwtShortExpiresIn'),
      },
    );
  }
}
