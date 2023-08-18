const { Sequelize } = require("sequelize");
const { logger } = require("../logger");
const { environment } = require("./environment.config");

const sequelize = new Sequelize(
  environment.DB_NAME,
  environment.DB_USER,
  environment.DB_PASSWORD,
  {
    dialect: environment.DB_DIALECT,
    host: environment.DB_HOST,
    define: {
      freezeTableName: true,
    },
    logging: (msg) => logger.info(msg),
  }
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.debug("Unable to connect to the sequelize:", error);
  }
};
connectToDb();

module.exports = { sequelize, connectToDb };