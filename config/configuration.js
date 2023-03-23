require('dotenv').config();

const development = {
  env: 'dev',
  port: process.env.PORT || 3000,
  host: process.env.HOST,
};

const test = {};
const production = {};
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: 'postgres',
};

module.exports = {
  development,
  test,
  production,
  dbConfig,
};
