import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bullmq';
import { Model } from 'mongoose';
import { QUEUE_NAME_PDF_EXPORT } from 'src/core';
import { Stock } from 'src/database/schemas/Stock';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    @InjectQueue(QUEUE_NAME_PDF_EXPORT) private readonly exportPDFQueue: Queue,
  ) {}

  async createStock(input: Record<string, any>) {
    const it = await this.stockModel.create({ ...input });
    const saved = await it.save();

    return saved;
  }

  async getStocks() {
    return this.stockModel.find().exec();
  }

  async deleteStock(id: string) {
    console.log(id);
  }

  async exportPdf(storeId: string) {
    await this.exportPDFQueue.add('export', { storeId });
    return { msg: 'PDF export in queue for processing' };
  }
}
