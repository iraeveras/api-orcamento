// FILE: src/infra/http/controllers/employeeController.ts
import { Request, Response } from 'express';
import { createEmployeeUseCase } from '@/domain/usecases/employee/createEmployeeUseCase';
import { updateEmployeeUseCase } from '@/domain/usecases/employee/updateEmployeeUseCase';
import { listEmployeeUseCase } from '@/domain/usecases/employee/listEmployeeUseCase';
import { deleteEmployeeUseCase } from '@/domain/usecases/employee/deleteEmployeeUseCase';
import { employeeRepositoryPrisma } from '@/infra/database/prisma/employeeRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const employeeRepository = employeeRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createEmployee(req: Request, res: Response): Promise<void> {
    try {
        if (!req.companyId) {
            res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
            return;
        }

        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };

        // força companyId do contexto (o middleware já faz, mas mantemos por segurança)
        const payload = { ...req.body, companyId: req.companyId };

        const useCase = createEmployeeUseCase(employeeRepository, auditlogRepository);
        const employee = await useCase.execute(payload, context);
        res.status(201).json(apiResponse(employee));
    } catch (error) {
        res
            .status(400)
            .json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateEmployee(req: Request, res: Response): Promise<void> {
    try {
        if (!req.companyId) {
            res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
            return;
        }

        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };

        const { id } = req.params;
        const useCase = updateEmployeeUseCase(employeeRepository, auditlogRepository);
        const employee = await useCase.execute(Number(id), req.companyId, req.body, context);
        res.status(200).json(apiResponse(employee));
    } catch (error) {
        res
            .status(400)
            .json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listEmployees(req: Request, res: Response): Promise<void> {
    try {
        if (!req.companyId) {
            res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
            return;
        }
        const useCase = listEmployeeUseCase(employeeRepository);
        const employees = await useCase.execute(req.companyId);
        res.status(200).json(apiResponse(employees));
    } catch (error) {
        res
            .status(400)
            .json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
        if (!req.companyId) {
            res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
            return;
        }

        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };

        const useCase = deleteEmployeeUseCase(employeeRepository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), req.companyId, context);
        res.status(204).json(apiResponse({ message: 'Employee deleted' }));
    } catch (error) {
        res
            .status(400)
            .json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}