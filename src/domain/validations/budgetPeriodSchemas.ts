// FILE: src/domain/validations/budgetPeriodSchemas.ts
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
}).superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "endDate não pode ser anterior a startDate", path: ["endDate"] });
    }
    const sY = data.startDate.getUTCFullYear();
    const eY = data.endDate.getUTCFullYear();
    if (sY !== data.year) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "startDate deve pertencer ao ano do período", path: ["startDate"] });
    }
    if (eY !== data.year) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "endDate deve pertencer ao ano do período", path: ["endDate"] });
    }
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
}).superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "endDate não pode ser anterior a startDate", path: ["endDate"] });
    }
    if (data.year && data.startDate && data.startDate.getUTCFullYear() !== data.year) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "startDate deve pertencer ao ano do período", path: ["startDate"] });
    }
    if (data.year && data.endDate && data.endDate.getUTCFullYear() !== data.year) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "endDate deve pertencer ao ano do período", path: ["endDate"] });
    }
});