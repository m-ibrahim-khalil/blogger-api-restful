'use strict';

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const {InvalidRoutesMiddleware} = require('./middlewares')
const logger = require('./logger');

const router = require('./routes');

class Server {

  constructor() {
    this.server = express();
  }

  setup(config) {
    this.server.set('env', config.env);
    this.server.set('hostname', config.host);
    this.server.set('port', config.port);

    this.server.use(logger(config.env));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());

    this.server.use('/', router);
    this.server.use(InvalidRoutesMiddleware);

    // this.server.use((req, res, next) => {
    //   next(createError(404));
    // });

  }

  start() {
    let hostname = this.server.get('hostname');
    let port = this.server.get('port');
    this.server.listen(port, () => {
      console.log('Express server listening on - http://' + hostname + ':' + port)
      logger.info('Express server listening on - http://' + hostname + ':' + port);
    });
  }

}

module.exports = new Server();
