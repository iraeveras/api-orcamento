import { z } from 'zod';

export const createCostCenterSchema = z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    companyId: z.number(),
    departmentId: z.number(),
    sectorId: z.number(),
    status: z.string().optional(),
});

export const updateCostCenterSchema = z.object({
    name: z.string().min(2).optional(),
    code: z.string().min(2).optional(),
    companyId: z.number().optional(),
    departmentId: z.number().optional(),
    sectorId: z.number().optional(),
    status: z.string().optional(),
});