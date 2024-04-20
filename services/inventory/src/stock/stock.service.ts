import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from 'src/database/schemas/Stock';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

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
    console.log(storeId);
    return { msg: 'PDF export not implemented' };
  }
}
