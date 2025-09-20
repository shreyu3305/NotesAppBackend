import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../modules/auth/tokens.js';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: {
          code: 'AUTH_EXPIRED',
          message: 'No valid authorization header'
        }
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const payload = verifyAccessToken(token);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({
        error: {
          code: 'AUTH_EXPIRED',
          message: 'Invalid or expired token'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: {
        code: 'AUTH_EXPIRED',
        message: 'Authentication failed'
      }
    });
  }
};
