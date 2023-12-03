import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/common/role.enum';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  isRemember?: boolean;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
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
