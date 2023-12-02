import { ApiProperty } from '@nestjs/swagger';
import { ERole } from 'src/common/role.enum';

export class GetAllUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: '1234567890' })
  phoneNumber: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', nullable: true })
  imageUrl: string | null;

  @ApiProperty({ example: 'male', nullable: true })
  gender: string | null;

  @ApiProperty({ example: '1990-01-01', nullable: true })
  dateOfBirth: Date | null;

  @ApiProperty({ example: ERole.USER })
  role: ERole;
}
