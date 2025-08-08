import { Request, Response } from 'express';
import { createBudgetPeriodUseCase } from '@/domain/usecases/budgetPeriod/createBudgetPeriodCase';
import { updateBudgetPeriodUseCase } from '@/domain/usecases/budgetPeriod/updateBudgetPeriodCase';
import { listBudgetPeriodUseCase } from '@/domain/usecases/budgetPeriod/listBudgetPeriodCase';
import { deleteBudgetPeriodUseCase } from '@/domain/usecases/budgetPeriod/deleteBudgetPeriodCase';
import { budgetPeriodRepositoryPrisma } from '@/infra/database/prisma/budgetPeriodRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const budgetPeriodRepository = budgetPeriodRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createBudgetPeriod(req: Request, res: Response) {
    const context = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const useCase = createBudgetPeriodUseCase(budgetPeriodRepository, auditlogRepository);
    const period = await useCase.execute(req.body, context);
    res.status(201).json(apiResponse(period));
}

export async function updateBudgetPeriod(req: Request, res: Response) {
    const context = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const { id } = req.params;
    const useCase = updateBudgetPeriodUseCase(budgetPeriodRepository, auditlogRepository);
    const period = await useCase.execute(Number(id), req.body, context);
    res.status(200).json(apiResponse(period));
}

export async function listBudgetPeriods(req: Request, res: Response) {
    const useCase = listBudgetPeriodUseCase(budgetPeriodRepository);
    const periods = await useCase.execute();
    res.status(200).json(apiResponse(periods));
}

export async function deleteBudgetPeriod(req: Request, res: Response) {
    const context = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const { id } = req.params;
    const useCase = deleteBudgetPeriodUseCase(budgetPeriodRepository, auditlogRepository);
    await useCase.execute(Number(id), context);
    res.status(204).json(apiResponse({ message: 'BudgetPeriod deleted' }));
}