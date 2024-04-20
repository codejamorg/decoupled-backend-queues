import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop()
  storeId: string;

  @Prop()
  name: string;

  @Prop()
  cost: string;

  @Prop()
  quantity: number;

  @Prop()
  expireAt: number;

  @Prop()
  createdBy: string;

  @Prop()
  quantitySold: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
