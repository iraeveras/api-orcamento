import { z } from 'zod';

export const createTeamSchema = z.object({    
    name: z.string().min(1, "Nome é obrigatório"),
    companyId: z.number(),
    sectorId: z.number(),
    leaderId: z.number(),
    status: z.string().default("active").optional()    
});

export const updateTeamSchema = z.object({    
    name: z.string().optional(),
    companyId: z.number().optional(),
    sectorId: z.number().optional(),
    leaderId: z.number().optional(),
    status: z.string().optional()    
});