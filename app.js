const server = require('./server');
const { development } = require('./config/configuration');

server.setup(development);
server.start();

module.exports = server;
