import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiHideProperty()
  qrCode?: string;
}
