import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  MONGODB: Joi.string().required(),
  PORT: Joi.number().port().default(3000),
  DEFAULT_LIMIT:Joi.number().integer().default(5)
})