import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { ERole } from 'src/common/role.enum';

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

  @ApiProperty()
  @IsInt()
  role: ERole;
}

export class RegisterResponseDto {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    username: string;
    phoneNumber: string;
    imageUrl: string;
    gender: string;
    dateOfBirth: Date;
    role: ERole;
  };
}
