import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    roleId: z.number(),
    companyIds: z.array(z.number()).optional(),
    status: z.string().optional(),
});

export const updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    roleId: z.number().optional(),
    companyIds: z.array(z.number()).optional(),
    status: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const forgotPasswordSchema = z.object({
    email: z.string().email()
});

export const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(6)
});