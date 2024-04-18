import * as joi from 'joi';

const properties = {
  PORT: joi.number().optional().default(3000),
  DB_PASSWORD: joi.string().required(),
  DB_USER: joi.string(),
  DB_HOST: joi.string(),
  DB_PORT: joi.number(),
};

export const schema = joi.object(properties).unknown().required();
