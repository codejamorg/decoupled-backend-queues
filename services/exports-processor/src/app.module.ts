import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './core/config';
import { BullModule } from '@nestjs/bullmq';
import { ExportJobModule } from './export-jobs/export-jobs.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.DB_URL),
    BullModule.forRoot({
      connection: { host: envs.REDIS_HOST, port: envs.REDIS_PORT },
    }),
    ExportJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
