// FILE: src/domain/validations/costCenterPlanSchemas.ts
import { z } from "zod";

export const createCostCenterPlanSchema = z.object({
    codPlanoCentroCusto: z.string().min(1, "Código obrigatório"),
    nomePlanoCentroCusto: z.string().min(1, "Nome obrigatório"),
    companyId: z.number(),
    status: z.enum(["active", "inactive"]).optional(),
});

export const updateCostCenterPlanSchema = z.object({
    codPlanoCentroCusto: z.string().min(1).optional(),
    nomePlanoCentroCusto: z.string().min(1).optional(),
    companyId: z.number().optional(),
    status: z.enum(["active", "inactive"]).optional(),
});