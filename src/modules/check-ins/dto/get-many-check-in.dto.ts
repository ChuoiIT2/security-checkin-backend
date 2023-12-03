import { ApiProperty } from '@nestjs/swagger';

class LocationGetManyCheckInDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

class UserGetManyCheckInDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  name: string;
}
export class GetManyCheckInDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  location: LocationGetManyCheckInDto;

  @ApiProperty()
  user: UserGetManyCheckInDto;
}
