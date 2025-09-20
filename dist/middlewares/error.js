import { ZodError } from 'zod';
import { envWithComputed as env } from '../config/env.js';
export const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    // Zod validation errors
    if (error instanceof ZodError) {
        const fields = {};
        error.errors.forEach(err => {
            if (err.path.length > 0) {
                fields[err.path.join('.')] = err.message;
            }
        });
        res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                fields
            }
        });
        return;
    }
    // MongoDB duplicate key error
    if (error.name === 'MongoError' && error.code === 11000) {
        res.status(409).json({
            error: {
                code: 'DUPLICATE_KEY',
                message: 'Resource already exists'
            }
        });
        return;
    }
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
        res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                fields: { general: error.message }
            }
        });
        return;
    }
    // Default error response
    const statusCode = 500;
    const message = env.isDevelopment ? error.message : 'Internal server error';
    res.status(statusCode).json({
        error: {
            code: 'INTERNAL',
            message
        }
    });
};
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.method} ${req.path} not found`
        }
    });
};
//# sourceMappingURL=error.js.map