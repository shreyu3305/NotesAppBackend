import rateLimit from 'express-rate-limit';
// Rate limit for authentication endpoints
export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: {
            code: 'RATE_LIMITED',
            message: 'Too many authentication attempts, please try again later'
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
// General API rate limit
export const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests, please try again later'
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rateLimit.js.map