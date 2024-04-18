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
  database: {
    PORT: number;
    HOST: string;
    USER: string;
    PASSWORD: string;
  };
}

export const envs: IEnv = {
  PORT: envValues.PORT || 3000,
  database: {
    PORT: envValues.DB_PORT || 5432,
    HOST: envValues.DB_HOST || 'localhost',
    USER: envValues.DB_USER,
    PASSWORD: envValues.PASSWORD,
  },
};
