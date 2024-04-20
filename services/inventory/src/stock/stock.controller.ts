import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post()
  async createStock(@Body() input: Record<string, any>) {
    const res = await this.stockService.createStock(input);
    return res;
  }

  @Get('/list')
  async getStocks() {
    const list = await this.stockService.getStocks();

    return list;
  }

  @Delete(':id')
  async deleteStock(@Param() id: string) {
    const res = await this.stockService.deleteStock(id);
    return res;
  }

  @Get('/export-pdf')
  async exportPdf(@Query() params: { storeId: string }) {
    const { storeId } = params;
    const res = await this.stockService.exportPdf(storeId);
    return res;
  }
}
