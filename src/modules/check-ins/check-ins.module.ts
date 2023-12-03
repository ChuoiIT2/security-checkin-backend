import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from 'src/entities/check-in.entity';

import { LocationsModule } from '../locations/location.module';
import { UsersModule } from '../users/users.module';
import { CheckInsController } from './check-ins.controller';
import { CheckInsService } from './check-ins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckIn]),
    forwardRef(() => UsersModule),
    forwardRef(() => LocationsModule),
  ],
  controllers: [CheckInsController],
  providers: [CheckInsService],
  exports: [CheckInsService],
})
export class CheckInsModule {}
