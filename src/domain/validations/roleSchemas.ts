import { z } from "zod";

export const permissionSchema = z.object({
    module: z.string(),
    actions: z.array(z.string()),
    scope: z.string()
});

export const createRoleSchema = z.object({
    name: z.string(),
    level: z.string(),
    description: z.string(),
    permissions: z.array(permissionSchema)
});

export const updateRoleSchema = z.object({
    name: z.string(),
    level: z.string(),
    description: z.string(),
    permissions: z.array(permissionSchema)
});