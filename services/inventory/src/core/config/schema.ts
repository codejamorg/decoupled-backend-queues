import * as joi from 'joi';

const properties = {
  PORT: joi.number().optional().default(3000),
  DB_URL: joi.string().required(),
  REDIS_HOST: joi.string().required(),
};

export const schema = joi.object(properties).unknown().required();
