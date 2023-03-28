const { createLogger, transports, format, addColors } = require('winston');

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const customFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message } = info;
    return `${timestamp} [${level.toUpperCase().padEnd(7)}]: ${message}`;
  })
);

class Logger {
  constructor() {
    const prodTransport = new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transport = new transports.Console({
      format: customFormat,
    });
    this.logger = createLogger({
      level: process.env.ENV === 'dev' ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [process.env.ENV === 'dev' ? transport : prodTransport],
    });
    addColors(customLevels.colors);
  }

  trace(msg, meta) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg, meta) {
    this.logger.debug(msg, meta);
  }

  info(msg, meta) {
    this.logger.info(msg, meta);
  }

  warn(msg, meta) {
    this.logger.warn(msg, meta);
  }

  error(msg, meta) {
    this.logger.error(msg, meta);
  }

  fatal(msg, meta) {
    this.logger.log('fatal', msg, meta);
  }
}

module.exports = new Logger();
