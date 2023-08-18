const server = require('./server');
const {environment} = require('./configs/environment.config');

server.setup(environment);
server.start();

module.exports = server;