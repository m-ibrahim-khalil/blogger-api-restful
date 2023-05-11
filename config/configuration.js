require('dotenv').config();

const development = {
  env: "dev",
  port : process.env.PORT || 3000,
  host: process.env.HOST || 'localhost'
}

const test = {}
const production = {}
const dbConfig = {
  user: process.env.DB_USER || 'liltlrmi',
  host: process.env.DB_HOST || 'arjuna.db.elephantsql.com',
  database: process.env.DB_NAME || 'liltlrmi',
  password: process.env.DB_PASSWORD || 'qxQoXwazc7as3gxRATxJeM2ga1J66wgP',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres'
}

module.exports = {
  development,
  test,
  production,
  dbConfig
}