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
}

export const envs: IEnv = {
  PORT: envValues.PORT || 3000,
  DB_URL: envValues.DB_URL,
  REDIS_HOST: envValues.REDIS_HOST,
  REDIS_PORT: envValues.REDIS_PORT || 6379,
};
