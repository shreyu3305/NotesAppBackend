import { NotesService } from './service.js';
import { NoteCreateSchema, NoteUpdateSchema } from '../../shared/schemas.js';
export class NotesController {
    static async create(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const validatedData = NoteCreateSchema.parse(req.body);
            const note = await NotesService.create(userId, validatedData);
            res.status(201).json(note);
        }
        catch (error) {
            res.status(400).json({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async getById(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Note ID is required'
                    }
                });
                return;
            }
            const note = await NotesService.getById(id, userId);
            res.json(note);
        }
        catch (error) {
            if (error.message === 'Note not found') {
                res.status(404).json({
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Note not found'
                    }
                });
            }
            else {
                res.status(500).json({
                    error: {
                        code: 'INTERNAL',
                        message: 'Internal server error'
                    }
                });
            }
        }
    }
    static async list(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const query = req.query.query;
            const tags = req.query.tags ? req.query.tags.split(',') : undefined;
            const result = await NotesService.list(userId, page, limit, query, tags);
            res.json(result);
        }
        catch (error) {
            res.status(500).json({
                error: {
                    code: 'INTERNAL',
                    message: 'Internal server error'
                }
            });
        }
    }
    static async update(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Note ID is required'
                    }
                });
                return;
            }
            const validatedData = NoteUpdateSchema.parse(req.body);
            const note = await NotesService.update(id, userId, validatedData);
            res.json(note);
        }
        catch (error) {
            if (error.message === 'Note not found') {
                res.status(404).json({
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Note not found'
                    }
                });
            }
            else {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.message
                    }
                });
            }
        }
    }
    static async delete(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Note ID is required'
                    }
                });
                return;
            }
            await NotesService.delete(id, userId);
            res.status(204).send();
        }
        catch (error) {
            if (error.message === 'Note not found') {
                res.status(404).json({
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Note not found'
                    }
                });
            }
            else {
                res.status(500).json({
                    error: {
                        code: 'INTERNAL',
                        message: 'Internal server error'
                    }
                });
            }
        }
    }
    static async getTags(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    error: {
                        code: 'AUTH_EXPIRED',
                        message: 'User not authenticated'
                    }
                });
                return;
            }
            const tags = await NotesService.getAllTags(userId);
            res.json({ tags });
        }
        catch (error) {
            res.status(500).json({
                error: {
                    code: 'INTERNAL',
                    message: 'Internal server error'
                }
            });
        }
    }
}
//# sourceMappingURL=controller.js.map