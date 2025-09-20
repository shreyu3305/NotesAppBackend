import { Request, Response } from 'express';
import { NotesService } from './service.js';
import { NoteCreateSchema, NoteUpdateSchema } from '../../shared/schemas.js';

export class NotesController {
  static async create(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message
        }
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      if (error.message === 'Note not found') {
        res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: 'Note not found'
          }
        });
      } else {
        res.status(500).json({
          error: {
            code: 'INTERNAL',
            message: 'Internal server error'
          }
        });
      }
    }
  }

  static async list(req: Request, res: Response): Promise<void> {
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

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const query = req.query.query as string;
      const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;

      const result = await NotesService.list(userId, page, limit, query, tags);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        error: {
          code: 'INTERNAL',
          message: 'Internal server error'
        }
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      if (error.message === 'Note not found') {
        res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: 'Note not found'
          }
        });
      } else {
        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: error.message
          }
        });
      }
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      if (error.message === 'Note not found') {
        res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: 'Note not found'
          }
        });
      } else {
        res.status(500).json({
          error: {
            code: 'INTERNAL',
            message: 'Internal server error'
          }
        });
      }
    }
  }

  static async getTags(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.status(500).json({
        error: {
          code: 'INTERNAL',
          message: 'Internal server error'
        }
      });
    }
  }
}
