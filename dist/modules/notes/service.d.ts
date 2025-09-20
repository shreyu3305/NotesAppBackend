import { NoteCreateInput, NoteUpdateInput, NotesListResponse } from '../../shared/schemas.js';
export declare class NotesService {
    static create(userId: string, data: NoteCreateInput): Promise<{
        _id: any;
        title: string;
        body: string;
        tags: string[];
        ownerId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static getById(noteId: string, userId: string): Promise<{
        _id: any;
        title: string;
        body: string;
        tags: string[];
        ownerId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static list(userId: string, page?: number, limit?: number, query?: string, tags?: string[]): Promise<NotesListResponse>;
    static update(noteId: string, userId: string, data: NoteUpdateInput): Promise<{
        _id: any;
        title: string;
        body: string;
        tags: string[];
        ownerId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static delete(noteId: string, userId: string): Promise<boolean>;
    static getAllTags(userId: string): Promise<string[]>;
}
//# sourceMappingURL=service.d.ts.map