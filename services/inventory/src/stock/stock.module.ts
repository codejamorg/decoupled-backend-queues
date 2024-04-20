import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from 'src/database/schemas/Stock';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME_PDF_EXPORT } from 'src/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    BullModule.registerQueue({
      name: QUEUE_NAME_PDF_EXPORT,
    }),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
