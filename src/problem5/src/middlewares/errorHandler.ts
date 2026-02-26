import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    logger.error(`[Error] ${err.message}`, { stack: err.stack });

    // In a production app, we wouldn't leak the stack trace
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message,
            status,
        }
    });
};
