// FILE: src/domain/validations/departmentSchemas.ts
import { z } from 'zod';

export const createDepartmentSchema = z.object({
    name: z.string().min(2).max(60),
    companyId: z.number().int(),
    status: z.string().min(2).max(20).optional(),
});

export const updateDepartmentSchema = z.object({
    name: z.string().min(2).max(60).optional(),
    companyId: z.number().int().optional(),
    status: z.string().min(2).max(20).optional(),
});