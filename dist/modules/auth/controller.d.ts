import { Request, Response } from 'express';
export declare class AuthController {
    static signup(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static refresh(req: Request, res: Response): Promise<void>;
    static logout(req: Request, res: Response): Promise<void>;
    static me(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map