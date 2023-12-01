import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/configs/app.config';
import authConfig from 'src/configs/auth.config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['.env.development', '.env.local'],
    }),
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
