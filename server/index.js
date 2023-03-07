'use strict';

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = require('./routes');

class Server {

  constructor() {
    this.server = express();
  }

  setup(config) {
    this.server.set('env', config.env);
    this.server.set('hostname', config.hostname);
    this.server.set('port', config.port);

    this.server.use(logger(config.env));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());

    this.server.use('/', router);

    this.server.use((req, res, next) => {
      next(createError(404));
    });

  }

  start() {
    let hostname = this.server.get('hostname');
    let port = this.server.get('port');
    this.server.listen(port, () => {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });
  }

}

module.exports = new Server();
