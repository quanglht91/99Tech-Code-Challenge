import { createLogger, format, transports, Logform } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Defines the custom log format
const logFormat = printf((info: Logform.TransformableInfo) => {
    return `${info.timestamp} [${info.level}]: ${info.stack || info.message}`;
});

/**
 * Winston Winston Logger Instance
 * Outputs to console in development, can be configured to write to files for production
 */
export const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat)
        })
    ]
});
