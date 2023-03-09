const Pool = require('pg').Pool;
const {dbConfig} = require('./config/configuration')

const pool = new Pool(dbConfig);

const createTable = async () => await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATE DEFAULT Now(),
    updatedAt DATE DEFAULT Now())`
);

console.log("DB table creation: ", createTable().then((val)=>console.log(val)).catch(err=>console.log(err)));

module.exports = pool;

