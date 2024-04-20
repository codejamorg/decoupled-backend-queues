import * as dotenv from 'dotenv-flow';
import { schema } from './schema';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH, silent: true })
  : dotenv.config({ silent: true });

const { error, value: envValues } = schema.validate(process.env);
if (error) {
  throw new Error(`Schema validation field: ${error.message}`);
}

interface IEnv {
  PORT: number;
  DB_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
}

export const envs: IEnv = {
  PORT: envValues.PORT || 3000,
  DB_URL: envValues.DB_URL,
  REDIS_HOST: envValues.REDIS_HOST,
  REDIS_PORT: envValues.REDIS_PORT || 6379,
  AWS_ACCESS_KEY_ID: envValues.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: envValues.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: envValues.AWS_REGION,
};
