import { ApiProperty } from '@nestjs/swagger';

export class GetAllLocationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  qrCode: string;
}
