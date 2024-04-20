import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { envs } from '../config';

export async function uploadFileToS3(
  bucketName: string,
  key: string,
  fileStream: Readable,
) {
  // Create an S3 client
  const s3Client = new S3Client({
    region: envs.AWS_REGION,
    credentials: {
      accessKeyId: envs.AWS_ACCESS_KEY_ID,
      secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
    },
  });

  const uploadS3 = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
    },
  });

  // const uploadCommand = new PutObjectCommand({
  //   Bucket: bucketName,
  //   Key: key,
  //   Body: fileStream,
  // });

  try {
    // Execute the upload command
    // const response = await s3Client.send(uploadCommand);
    const res = await uploadS3.done();
    console.log('File uploaded successfully:', res.ETag);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
