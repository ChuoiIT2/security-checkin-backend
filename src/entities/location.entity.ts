import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CheckIn } from './check-in.entity';
import { FullAuditedEntity } from './full-audited.entity';

@Entity('locations')
export class Location extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  longitude: string;

  @Column({ type: 'varchar', nullable: false })
  latitude: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  qrCode: string;

  @OneToMany(() => CheckIn, (checkIn) => checkIn.location)
  checkIns: CheckIn[];
}
