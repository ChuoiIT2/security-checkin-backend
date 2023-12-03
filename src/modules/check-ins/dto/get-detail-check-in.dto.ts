import { ApiProperty } from '@nestjs/swagger';
import { GetDetailLocationDto } from 'src/modules/locations/dto/get-detail-location.dto';
import { GetDetailUserDto } from 'src/modules/users/dto/get-detail-user.dto';

export class GetDetailCheckInDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  location: GetDetailLocationDto;

  @ApiProperty()
  user: GetDetailUserDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  createdById?: number;
}
