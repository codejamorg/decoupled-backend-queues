import { Module } from '@nestjs/common';
import { ExportJobConsumer } from './export-jobs.consumer';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from 'src/database/schemas/Stock';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME_PDF_EXPORT } from 'src/core/constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    BullModule.registerQueue({
      name: QUEUE_NAME_PDF_EXPORT,
    }),
  ],
  controllers: [],
  providers: [ExportJobConsumer],
})
export class ExportJobModule {}
