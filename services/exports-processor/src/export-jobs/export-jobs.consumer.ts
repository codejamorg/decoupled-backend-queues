import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';
import { QUEUE_NAME_PDF_EXPORT } from 'src/core/constant';
import { Stock } from 'src/database/schemas/Stock';
import { Model } from 'mongoose';

@Processor(QUEUE_NAME_PDF_EXPORT)
export class ExportJobConsumer extends WorkerHost {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {
    super();
  }

  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    console.log(job.data, token, 'job');
  }
}
