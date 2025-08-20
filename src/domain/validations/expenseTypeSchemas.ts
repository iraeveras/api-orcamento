import { z } from 'zod';

export const createExpenseTypeSchema = z.object({
    planoCentroCustoItemId: z.number(),
    codTipoDespesa: z.string().min(1),
    nomeTipoDespesa: z.string().min(1),
    status: z.enum(['active', 'inactive']).optional(),
});

export const updateExpenseTypeSchema = z.object({
    planoCentroCustoItemId: z.number().optional(),
    codTipoDespesa: z.string().min(1).optional(),
    nomeTipoDespesa: z.string().min(1).optional(),
    status: z.enum(['active', 'inactive']).optional(),
});