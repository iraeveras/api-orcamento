import { z } from 'zod';

export const createEmployeeSchema = z.object({
    matricula: z.string().min(1),
    name: z.string().min(2),
    admission: z.string().min(8), // yyyy-mm-dd ou dd/mm/yyyy, ajuste se necessário
    position: z.string().min(2),
    salary: z.number(),
    dangerPay: z.boolean(),
    status: z.string().optional(),
    companyId: z.number(),
    departmentId: z.number(),
    sectorId: z.number(),
});

export const updateEmployeeSchema = z.object({
    matricula: z.string().min(1).optional(),
    name: z.string().min(2).optional(),
    admission: z.string().min(8).optional(),
    position: z.string().min(2).optional(),
    salary: z.number().optional(),
    dangerPay: z.boolean().optional(),
    status: z.string().optional(),
    companyId: z.number().optional(),
    departmentId: z.number().optional(),
    sectorId: z.number().optional(),
});