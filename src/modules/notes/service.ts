import { Note } from './model.js';
import { NoteCreateInput, NoteUpdateInput, NotesListResponse } from '../../shared/schemas.js';
import mongoose from 'mongoose';

export class NotesService {
  static async create(userId: string, data: NoteCreateInput) {
    const note = new Note({
      ...data,
      ownerId: new mongoose.Types.ObjectId(userId)
    });

    await note.save();

    return {
      _id: note._id.toString(),
      title: note.title,
      body: note.body,
      tags: note.tags,
      ownerId: note.ownerId.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    };
  }

  static async getById(noteId: string, userId: string) {
    const note = await Note.findOne({
      _id: noteId,
      ownerId: new mongoose.Types.ObjectId(userId)
    });

    if (!note) {
      throw new Error('Note not found');
    }

    return {
      _id: note._id.toString(),
      title: note.title,
      body: note.body,
      tags: note.tags,
      ownerId: note.ownerId.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    };
  }

  static async list(userId: string, page: number = 1, limit: number = 20, query?: string, tags?: string[]): Promise<NotesListResponse> {
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter: any = {
      ownerId: new mongoose.Types.ObjectId(userId)
    };

    // Add search query
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { body: { $regex: query, $options: 'i' } }
      ];
    }

    // Add tag filter
    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    const [notes, total] = await Promise.all([
      Note.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Note.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: notes.map(note => ({
        _id: note._id.toString(),
        title: note.title,
        body: note.body,
        tags: note.tags,
        ownerId: note.ownerId.toString(),
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
      })),
      page,
      total,
      totalPages
    };
  }

  static async update(noteId: string, userId: string, data: NoteUpdateInput) {
    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        ownerId: new mongoose.Types.ObjectId(userId)
      },
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!note) {
      throw new Error('Note not found');
    }

    return {
      _id: note._id.toString(),
      title: note.title,
      body: note.body,
      tags: note.tags,
      ownerId: note.ownerId.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    };
  }

  static async delete(noteId: string, userId: string) {
    const result = await Note.findOneAndDelete({
      _id: noteId,
      ownerId: new mongoose.Types.ObjectId(userId)
    });

    if (!result) {
      throw new Error('Note not found');
    }

    return true;
  }

  static async getAllTags(userId: string): Promise<string[]> {
    const tags = await Note.distinct('tags', {
      ownerId: new mongoose.Types.ObjectId(userId)
    });
    return tags.sort();
  }
}
