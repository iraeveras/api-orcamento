import { z } from 'zod';

const cnpjRegex = /^\d{14}$/;

export const createCompanySchema = z.object({
    cnpj: z
        .string()
        .regex(cnpjRegex, "CNPJ deve conter 14 dígitos numéricos")
        .min(14, "CNPJ deve conter 14 dígitos")
        .max(14, "CNPJ deve conter 14 dígitos"),
    corporateName: z
        .string()
        .min(2, "Razão social obrigatória")
        .max(100, "Razão social deve ter até 100 caracteres"),
    tradeName: z
        .string()
        .min(2, "Nome fantasia obrigatório")
        .max(100, "Nome fantasia deve ter até 100 caracteres"),
    status: z
        .enum(["active", "inactive"])
        .optional()
        .default("active"),
})