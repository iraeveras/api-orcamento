import { nullable, z } from "zod";

export const createBudgetPeriodSchema = z.object({
    year: z.number(),
    companyId: z.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(["open", "closed", "pending"]).optional(),
    description: z.string().min(1, "Descrição obrigatória"),
    closedBy: z.string().optional().nullable(),
    closedAt: z.coerce.date().optional().nullable(),
});

export const updateBudgetPeriodSchema = z.object({
    year: z.number().optional(),
    companyId: z.number().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum(["open", "closed", "pending"]).optional(),
    description: z.string().optional(),
    closedBy: z.string().optional().nullable(),
    closedAt: z.coerce.date().optional().nullable(),
});