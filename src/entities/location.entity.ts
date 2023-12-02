import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
