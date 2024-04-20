import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';
import { QUEUE_NAME_PDF_EXPORT } from 'src/core/constant';
import { Stock } from 'src/database/schemas/Stock';
import { Model } from 'mongoose';
import { generateStockPDF } from 'src/core/utils/generate-pdf';
import { nanoid } from 'nanoid';
import { uploadFileToS3 } from 'src/core/utils/upload-s3';
import * as fs from 'node:fs';

@Processor(QUEUE_NAME_PDF_EXPORT)
export class ExportJobConsumer extends WorkerHost {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {
    super();
  }

  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    console.log(job.data, token, 'job');
    try {
      const { storeId } = job.data as { storeId: string };
      const items = await this.stockModel.find({ storeId }).exec();

      // generate pdf
      const name = `${storeId}_${nanoid()}.pdf`;
      const writePath = await generateStockPDF(items, name);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // upload to s3
      const fileStream = fs.createReadStream(writePath);
      const s3BucketName = 'demo-3707';
      await uploadFileToS3(s3BucketName, `pdf/${writePath}`, fileStream);
      const url = `https://${s3BucketName}.s3.amazonaws.com/pdf/${writePath}`;
      console.log('file-url:', url);

      //remove local file
      fs.unlinkSync(writePath);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
