import { Request, Response } from "express";
import { createRoleUseCase } from "@/domain/usecases/roles/createRoleUseCase";
import { updateRoleUseCase } from "@/domain/usecases/roles/updateRoleUseCase";
import { listRolesUseCase } from "@/domain/usecases/roles/listRolesUseCase";
import { deleteRoleUseCase } from "@/domain/usecases/roles/deleteRoleUseCase";
import { rolesRepositoryPrisma } from "@/infra/database/prisma/rolesRepositoryPrisma";
import { apiResponse } from "@/shared/utils/apiResponse";
import { auditlogRepositoryPrisma } from "@/infra/database/prisma/auditlogRepositoryPrisma";

const rolesRepository = rolesRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createRole(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        }
        const useCase = createRoleUseCase(rolesRepository, auditlogRepository);
        const role = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(role));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : "Unexpected error"));
    }
}

export async function updateRole(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        }
        const useCase = updateRoleUseCase(rolesRepository, auditlogRepository);
        const { id } = req.params;
        const role = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(role));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : "Unexpected error"));
    }
}

export async function listRoles(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listRolesUseCase(rolesRepository);
        const roles = await useCase.execute();
        res.status(200).json(apiResponse(roles));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : "Unexpected error"));
    }
}

export async function deleteRole(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteRoleUseCase(rolesRepository, auditlogRepository);
        const { id } = req.params;
        const result = await useCase.execute(Number(id), context);
        
        res.status(204).json(apiResponse({ message: "Role deleted" }));
        
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : "Unexpected error"));
    }
}