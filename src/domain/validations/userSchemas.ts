import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    roleId: z.number()
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