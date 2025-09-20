import { z } from 'zod';
export declare const SignUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const NoteCreateSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
    tags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
    tags: string[];
}, {
    title: string;
    body: string;
    tags?: string[] | undefined;
}>;
export declare const NoteUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    body?: string | undefined;
    tags?: string[] | undefined;
}, {
    title?: string | undefined;
    body?: string | undefined;
    tags?: string[] | undefined;
}>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
export interface ApiError {
    error: {
        code: string;
        message: string;
        fields?: Record<string, string>;
    };
}
export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface Note {
    _id: string;
    title: string;
    body: string;
    tags: string[];
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
export interface RefreshResponse {
    accessToken: string;
}
export interface NotesListResponse {
    items: Note[];
    page: number;
    total: number;
    totalPages: number;
}
//# sourceMappingURL=schemas.d.ts.map