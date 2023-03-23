const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/configuration');
const logger = require('./logger');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    define: {
      freezeTableName: true,
    },
    logging: (msg) => logger.info(msg),
  }
);

const testF = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.debug('Unable to connect to the database:', error);
  }
};

testF();

module.exports = sequelize;
