import { Request, Response, NextFunction } from 'express';
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
export declare const authGuard: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authGuard.d.ts.map