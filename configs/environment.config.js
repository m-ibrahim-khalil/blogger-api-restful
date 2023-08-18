const dotenv = require('dotenv');

let envFileName = ".env";

switch (process.env.NODE_ENV) {
  case "production":
    envFileName = ".env.production";
    break;
  case "development":
    envFileName = ".env.development";
    break;
  case "test":
    envFileName = ".env.test";
    break;
  default:
    envFileName = ".env";
    break;
}

dotenv.config({
  path: envFileName,
});

const environment = {
  APP_NAME: process.env.APP_NAME ?? "TechGlimpse",
  NODE_ENV: process.env.NODE_ENV ?? "production",
  PORT: process.env.PORT ?? 3001,
  HOST: process.env.HOST ?? "localhost",

  DB_NAME: process.env.DB_NAME ?? "postgres",
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: process.env.DB_PORT ?? 5432,
  DB_DIALECT: process.env.DB_DIALECT ?? "postgres",
  
  SALT: process.env.SALT ?? 10,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? "JWT_ACCESS_KEY",
  JWT_ACCESS_TOKEN_LIFE: process.env.JWT_ACCESS_TOKEN_LIFE ?? "5m",
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET ?? "JWT_REFRESH_KEY",
  JWT_REFRESH_TOKEN_LIFE: process.env.JWT_REFRESH_TOKEN_LIFE ?? "10d",
  
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME ?? "CLOUDINARY_NAME",
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY ?? "CLOUDINARY_KEY",
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET ?? "CLOUDINARY_SECRET",
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER ?? "CLOUDINARY_FOLDER",
};

module.exports = { environment };