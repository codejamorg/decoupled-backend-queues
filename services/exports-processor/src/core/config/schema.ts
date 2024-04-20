import * as joi from 'joi';

const properties = {
  PORT: joi.number().optional().default(3000),
  DB_URL: joi.string().required(),
  REDIS_HOST: joi.string().required(),
  AWS_REGION: joi.string(),
  AWS_ACCESS_KEY_ID: joi.string(),
  AWS_SECRET_ACCESS_KEY: joi.string(),
};

export const schema = joi.object(properties).unknown().required();
