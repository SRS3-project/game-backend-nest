import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test"),
  PORT: Joi.number().default(8080),
  TOKEN: Joi.string().optional(),
  DB_PREFIX: Joi.string().required(),
  GCLOUD_PROJECT: Joi.string().required(),
  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),
  SESSION_SECRET: Joi.string().optional(),
  RTM_URL: Joi.string().optional(),
  RTM_TOKEN: Joi.string().optional(),
  JWT_SECRET: Joi.string().required(),
  MAP_WIDTH: Joi.number().required(),
  MAP_HEIGHT: Joi.number().required(),
  CLIENT_EMAIL: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
  PROJECT_ID: Joi.string().required(),
});
