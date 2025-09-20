import { z } from 'zod';
// Auth Schemas
export const SignUpSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters')
});
export const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});
// Notes Schemas
export const NoteCreateSchema = z.object({
    title: z.string().min(1, 'Title is required').max(120, 'Title must be less than 120 characters'),
    body: z.string().min(1, 'Body is required'),
    tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional().default([])
});
export const NoteUpdateSchema = NoteCreateSchema.partial();
//# sourceMappingURL=schemas.js.map