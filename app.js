const fs = require('fs');
const server = require('./server');
const {development} = require('./config/server');

server.setup(development);
server.start();

module.exports = server;