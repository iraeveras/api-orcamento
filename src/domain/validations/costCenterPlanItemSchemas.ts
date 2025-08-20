import { z } from 'zod';

export const createCostCenterPlanItemSchema = z.object({
    planoCentroCustoId: z.number(),
    codPlanoCentroCustoItem: z.string().min(1),
    nomePlanoCentroCustoItem: z.string().min(1),
    status: z.enum(['active', 'inactive']).optional(),
});

export const updateCostCenterPlanItemSchema = z.object({
    planoCentroCustoId: z.number().optional(),
    codPlanoCentroCustoItem: z.string().min(1).optional(),
    nomePlanoCentroCustoItem: z.string().min(1).optional(),
    status: z.enum(['active', 'inactive']).optional(),
});