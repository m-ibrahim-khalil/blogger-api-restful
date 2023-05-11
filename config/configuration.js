require('dotenv').config();

const development = {
  env: "dev",
  port : process.envDemo.PORT || 3000,
  host: process.envDemo.HOST
}

const test = {}
const production = {}
const dbConfig = {
  user: process.envDemo.DB_USER,
  host: process.envDemo.DB_HOST,
  database: process.envDemo.DB_NAME,
  password: process.envDemo.DB_PASSWORD,
  port: process.envDemo.DB_PORT,
  dialect: 'postgres'
}

module.exports = {
  development,
  test,
  production,
  dbConfig
}