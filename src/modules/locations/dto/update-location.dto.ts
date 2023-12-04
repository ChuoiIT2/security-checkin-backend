import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  longitude?: string;

  @ApiProperty({ required: false })
  latitude?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  description?: string;
}
