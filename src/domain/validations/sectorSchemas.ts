// FILE: src/domain/validations/sectorSchemas.ts
import { z } from 'zod';

export const createSectorSchema = z.object({
    name: z.string().min(1),
    companyId: z.number().int(),
    departmentId: z.number().int(),
    status: z.string().min(1).optional(),
});

export const updateSectorSchema = z.object({
    name: z.string().min(1).optional(),
    companyId: z.number().int().optional(),
    departmentId: z.number().int().optional(),
    status: z.string().optional(),
});