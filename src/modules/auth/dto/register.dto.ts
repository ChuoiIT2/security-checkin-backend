import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { ERole } from 'src/common/role.enum';

import { UserDto } from './login.dto';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  dateOfBirth?: Date;

  @ApiHideProperty()
  @IsInt()
  role?: ERole;
}

export class RegisterResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: UserDto;
}
