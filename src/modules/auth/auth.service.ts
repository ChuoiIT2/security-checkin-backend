import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as brcrypt from 'bcrypt';
import { IAppConfig } from 'src/configs/app.config';
import { IAuthConfig } from 'src/configs/auth.config';

import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email, true);

    if (!user || !brcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Email or password is incorrect',
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
