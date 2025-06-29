import { Request, Response } from 'express';
import { createDepartmentUseCase } from '@/domain/usecases/department/createDepartmentUseCase';
import { updateDepartmentUseCase } from '@/domain/usecases/department/updateDepartmentUseCase';
import { listDepartmentUseCase } from '@/domain/usecases/department/listDepartmentUseCase';
import { deleteDepartmentUseCase } from '@/domain/usecases/department/deleteDepartmentUseCase';
import { departmentRepositoryPrisma } from '@/infra/database/prisma/departmentRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const departmentRepository = departmentRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createDepartment(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = createDepartmentUseCase(departmentRepository, auditlogRepository);
        const department = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(department));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateDepartment(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = updateDepartmentUseCase(departmentRepository, auditlogRepository);
        const { id } = req.params;
        const department = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(department));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listDepartments(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listDepartmentUseCase(departmentRepository);
        const departments = await useCase.execute();
        res.status(200).json(apiResponse(departments));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteDepartment(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteDepartmentUseCase(departmentRepository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), context);
        res.status(204).json(apiResponse({ message: "Department deleted" }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}