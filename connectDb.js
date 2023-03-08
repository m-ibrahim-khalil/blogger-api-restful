const Pool = require('pg').Pool;
const {dbConfig} = require('./config/server')
// const dotenv = require('dotenv').config();

const pool = new Pool(dbConfig);

// const createTable = async () => await pool.query(
//     `CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE} (
//         id VARCHAR(255) PRIMARY KEY DEFAULT uuid(),
//         username VARCHAR(255) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         createdAt DATETIME DEFAULT Now(),
//         updatedAt DATETIME DEFAULT Now())`
// );

// console.log("DB table creation: ", createTable().then((val)=>"").catch(err=>"err"));

module.exports = pool;