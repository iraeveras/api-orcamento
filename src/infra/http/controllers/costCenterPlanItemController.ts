import { Request, Response } from 'express';
import { apiResponse } from '@/shared/utils/apiResponse';
import { costCenterPlanItemRepositoryPrisma } from '@/infra/database/prisma/costCenterPlanItemRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { createCostCenterPlanItemUseCase } from '@/domain/usecases/costCenterPlanItem/createCostCenterPlanItemCase';
import { updateCostCenterPlanItemUseCase } from '@/domain/usecases/costCenterPlanItem/updateCostCenterPlanItemCase';
import { listCostCenterPlanItemUseCase } from '@/domain/usecases/costCenterPlanItem/listCostCenterPlanItemCase';
import { deleteCostCenterPlanItemUseCase } from '@/domain/usecases/costCenterPlanItem/deleteCostCenterPlanItemCase';

const repo = costCenterPlanItemRepositoryPrisma();
const audit = auditlogRepositoryPrisma();

export async function createCostCenterPlanItem(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const useCase = createCostCenterPlanItemUseCase(repo, audit);
    const created = await useCase.execute(req.body, ctx);
    res.status(201).json(apiResponse(created));
}

export async function updateCostCenterPlanItem(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = updateCostCenterPlanItemUseCase(repo, audit);
    const updated = await useCase.execute(id, req.body, ctx);
    res.status(200).json(apiResponse(updated));
}

export async function listCostCenterPlanItems(req: Request, res: Response) {
    const useCase = listCostCenterPlanItemUseCase(repo);
    const filters = {
        planoCentroCustoId: req.query.planoCentroCustoId ? Number(req.query.planoCentroCustoId) : undefined,
        status: (req.query.status as 'active' | 'inactive') || undefined,
        search: (req.query.search as string) || undefined,
    };
    const data = await useCase.execute(filters);
    res.status(200).json(apiResponse(data));
}

export async function deleteCostCenterPlanItem(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = deleteCostCenterPlanItemUseCase(repo, audit);
    await useCase.execute(id, ctx);
    res.status(204).json(apiResponse({ message: 'CostCenterPlanItem deleted' }));
}