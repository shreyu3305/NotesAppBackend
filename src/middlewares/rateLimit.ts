import { Request, Response, NextFunction } from 'express';

// No-op rate limiting middleware (disabled)
export const authRateLimit = (req: Request, res: Response, next: NextFunction) => {
  next();
};

// No-op rate limiting middleware (disabled)
export const apiRateLimit = (req: Request, res: Response, next: NextFunction) => {
  next();
};
