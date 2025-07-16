import { z } from 'zod';

export const createAcquisitionPeriodSchema = z.object({
    employeeId: z.number(),
    startDate: z.string().min(8),
    endDate: z.string().min(8),
    year: z.number(),
    status: z.string().optional(),
});

export const updateAcquisitionPeriodSchema = z.object({
    startDate: z.string().min(8).optional(),
    endDate: z.string().min(8).optional(),
    year: z.number().optional(),
    status: z.string().optional(),
});