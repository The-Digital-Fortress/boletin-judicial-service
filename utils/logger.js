const winston = require('winston');

class Logger {
  constructor(context) {
    this.context = context;
    this.logLevel = process.env.LOGGING_LEVEL || 'info';

    this.logger = winston.createLogger({
      format: winston.format.combine(
        // winston.format.timestamp(),
        // winston.format.simple(),
      ),
      level: this.logLevel,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp(),
            winston.format.printf((msg) => {
              const { timestamp, level, message, ...meta } = msg;
              return `[${timestamp}] [${level}] [${meta.context}] ${message}`;
            })
          )
        }), // Log to the console
        // new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
      ]
    });
  }

  setLoggerContext(context) {
    this.context = context;
  }

  log(level, message) {
    if (this.context) {
      this.logger.log(level, message, { context: this.context });
    } else {
      this.logger.log(level, message);
    }
  }

  info(message) {
    this.log('info', message);
  }

  debug(message) {
    this.log('debug', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = Logger; // Export the Logger class directly
