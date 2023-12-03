import { ApiProperty } from '@nestjs/swagger';

export class GetDetailLocationDto {
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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdById?: number;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  updatedById?: number;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  deletedById?: number;
}
