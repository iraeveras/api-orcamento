// FILE: src/domain/validations/expenseSubtypeSchemas.ts
import { z } from 'zod';

export const createExpenseSubtypeSchema = z.object({
    tipoDespesaId: z.number(),
    codSubtipoDespesa: z.string().min(1),
    nomeSubtipoDespesa: z.string().min(1),
    status: z.enum(['active', 'inactive']).optional(),
});

export const updateExpenseSubtypeSchema = z.object({
    tipoDespesaId: z.number().optional(),
    codSubtipoDespesa: z.string().min(1).optional(),
    nomeSubtipoDespesa: z.string().min(1).optional(),
    status: z.enum(['active', 'inactive']).optional(),
});