import { Request, Response } from 'express';
import { createCostCenterUseCase } from '@/domain/usecases/costcenter/createCostCenterUseCase';
import { updateCostCenterUseCase } from '@/domain/usecases/costcenter/updateCostCenterUseCase';
import { listCostCenterUseCase } from '@/domain/usecases/costcenter/listCostCenterUseCase';
import { deleteCostCenterUseCase } from '@/domain/usecases/costcenter/deleteCostCenterUseCase';
import { costCenterRepositoryPrisma } from '@/infra/database/prisma/costCenterRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const costCenterRepository = costCenterRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createCostCenter(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = createCostCenterUseCase(costCenterRepository, auditlogRepository);
        const costCenter = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(costCenter));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateCostCenter(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = updateCostCenterUseCase(costCenterRepository, auditlogRepository);
        const { id } = req.params;
        const costCenter = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(costCenter));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listCostCenters(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listCostCenterUseCase(costCenterRepository);
        const costCenters = await useCase.execute();
        res.status(200).json(apiResponse(costCenters));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteCostCenter(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteCostCenterUseCase(costCenterRepository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), context);
        res.status(204).json(apiResponse({ message: "CostCenter deleted" }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}