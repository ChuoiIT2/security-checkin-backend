import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Location } from './location.entity';
import { User } from './user.entity';

@Entity('check-ins')
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @ManyToOne(() => Location, (location) => location.checkIns)
  location: Location;

  @ManyToOne(() => User, (user) => user.checkIns)
  user: User;
}
