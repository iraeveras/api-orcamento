// FILE: src/domain/validations/vacationsSchemas.ts
import { z } from "zod";

export const createVacationSchema = z.object({
    employeeId: z.number(),
    companyId: z.number(),
    sectorId: z.number(),
    budgetPeriodId: z.number(),
    acquisitionPeriodStart: z.string().datetime(),
    acquisitionPeriodEnd: z.string().datetime(),
    month: z.number().min(1).max(12),
    year: z.number(),
    vacationDays: z.number().min(0),
    abonoDays: z.number().min(0),
    thirteenthAdvance: z.boolean(),
    baseSalary: z.number(),
    overtimeAverage: z.number(),
    vacationValue: z.number(),
    onethirdValue: z.number(),
    abonoValue: z.number(),
    abonoOnethirdValue: z.number(),
    status: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.acquisitionPeriodEnd < data.acquisitionPeriodStart) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "acquisitionPeriodEnd não pode ser anterior a acquisitionPeriodStart",
            path: ["acquisitionPeriodEnd"],
        });
    }
    if (data.vacationDays + data.abonoDays <= 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Informe ao menos 1 dia entre férias e abono.",
            path: ["vacationDays"],
        });
    }
});

export const updateVacationSchema = z.object({
    employeeId: z.number().optional(),
    companyId: z.number().optional(),
    sectorId: z.number().optional(),
    budgetPeriodId: z.number().optional(),
    acquisitionPeriodStart: z.string().datetime().optional(),
    acquisitionPeriodEnd: z.string().datetime().optional(),
    month: z.number().min(1).max(12).optional(),
    year: z.number().optional(),
    vacationDays: z.number().min(0).optional(),
    abonoDays: z.number().min(0).optional(),
    thirteenthAdvance: z.boolean().optional(),
    baseSalary: z.number().optional(),
    overtimeAverage: z.number().optional(),
    vacationValue: z.number().optional(),
    onethirdValue: z.number().optional(),
    abonoValue: z.number().optional(),
    abonoOnethirdValue: z.number().optional(),
    status: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.acquisitionPeriodStart && data.acquisitionPeriodEnd) {
        if (data.acquisitionPeriodEnd < data.acquisitionPeriodStart) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "acquisitionPeriodEnd não pode ser anterior a acquisitionPeriodStart",
                path: ["acquisitionPeriodEnd"],
            });
        }
    }
});
