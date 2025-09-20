import { Request, Response } from 'express';
export declare class NotesController {
    static create(req: Request, res: Response): Promise<void>;
    static getById(req: Request, res: Response): Promise<void>;
    static list(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
    static getTags(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map