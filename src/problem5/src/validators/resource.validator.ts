import { z } from 'zod';

export const createResourceSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long'),
        description: z.string().min(10, 'Description must be at least 10 characters long'),
        category: z.string().min(2, 'Category must be at least 2 characters long'),
    }),
});

export const updateResourceSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
        description: z.string().min(10, 'Description must be at least 10 characters long').optional(),
        category: z.string().min(2, 'Category must be at least 2 characters long').optional(),
    }).strict(),
    params: z.object({
        id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
    }),
});

export const getResourceByIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
    }),
});
