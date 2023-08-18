'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { InvalidRoutesMiddleware } = require('./middlewares');
const logger = require('./logger');
const router = require('./routes');
const { ErrorHandlerMiddleware } = require('./middlewares');

class Server {
  constructor() {
    this.server = express();
  }

  setup(config) {
    this.server.set('env', config.NODE_ENV);
    this.server.set('hostname', config.HOST);
    this.server.set('port', config.PORT);
    this.server.use(
      cors({
        origin: ['http://localhost:5173', 'http://192.168.1.73:5173', 'http://0.0.0.0:5173', 'http://127.0.0.1:5173'],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser({}));
    this.server.use('/api/v1', router);
    this.server.use(InvalidRoutesMiddleware);
    this.server.use(ErrorHandlerMiddleware);
  }

  start() {
    const hostname = this.server.get('hostname');
    const port = this.server.get('port');
    this.server.listen(port, () => {
      logger.info(`Express server listening on - http://${hostname}:${port}`);
      console.log(`Express server listening on - http://${hostname}:${port}`);
    });
  }
}

module.exports = new Server();
