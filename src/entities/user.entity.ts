import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { FullAuditedEntity } from './full-audited.entity';

@Entity('users')
export class User extends FullAuditedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth: Date;
}
