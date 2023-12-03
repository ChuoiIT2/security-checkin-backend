import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';

export class GetDetailCheckInDto {
  id: number;
  time: Date;
  location: Location;
  user: User;
  createdAt: Date;
  updatedAt?: Date;
  createdById?: number;
}
