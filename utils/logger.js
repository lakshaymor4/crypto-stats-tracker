const winston = require('winston');
const config = require('../config/config');

// Create a logger instance with different log levels and formats
const logger = winston.createLogger({
    // Set log level based on the environment (production or development)
    level: config.env === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        // Include timestamp in logs
        winston.format.timestamp(),
        // Format logs in JSON
        winston.format.json()
    ),
    transports: [
        // Output logs to the console
        new winston.transports.Console(),
        // Output error logs to a file
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // Output all logs to a combined log file
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;
