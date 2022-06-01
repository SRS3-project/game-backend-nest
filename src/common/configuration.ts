export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  TOKEN: process.env.TOKEN,
  DB_PREFIX: process.env.DB_PREFIX,
  GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  SESSION_SECRET: process.env.SESSION_SECRET,
  RTM_URL: process.env.RTM_URL,
  RTM_TOKEN: process.env.RTM_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
  MAP_WIDTH: process.env.MAP_WIDTH,
  MAP_HEIGHT: process.env.MAP_HEIGHT,
});
