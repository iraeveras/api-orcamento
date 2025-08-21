// FILE: src/infra/http/controllers/expenseTypeController.ts
import { Request, Response } from 'express';
import { apiResponse } from '@/shared/utils/apiResponse';
import { expenseTypeRepositoryPrisma } from '@/infra/database/prisma/expenseTypeRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { createExpenseTypeUseCase } from '@/domain/usecases/expenseType/createExpenseTypeCase';
import { updateExpenseTypeUseCase } from '@/domain/usecases/expenseType/updateExpenseTypeCase';
import { listExpenseTypeUseCase } from '@/domain/usecases/expenseType/listExpenseTypeCase';
import { deleteExpenseTypeUseCase } from '@/domain/usecases/expenseType/deleteExpenseTypeCase';

const repo = expenseTypeRepositoryPrisma();
const audit = auditlogRepositoryPrisma();

export async function createExpenseType(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const useCase = createExpenseTypeUseCase(repo, audit);
    const created = await useCase.execute(req.body, ctx);
    res.status(201).json(apiResponse(created));
}

export async function updateExpenseType(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = updateExpenseTypeUseCase(repo, audit);
    const updated = await useCase.execute(id, req.body, ctx);
    res.status(200).json(apiResponse(updated));
}

export async function listExpenseTypes(req: Request, res: Response) {
    const useCase = listExpenseTypeUseCase(repo);
    const filters = {
        planoCentroCustoItemId: req.query.planoCentroCustoItemId ? Number(req.query.planoCentroCustoItemId) : undefined,
        status: (req.query.status as 'active' | 'inactive') || undefined,
        search: (req.query.search as string) || undefined,
    };
    const data = await useCase.execute(filters);
    res.status(200).json(apiResponse(data));
}

export async function deleteExpenseType(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = deleteExpenseTypeUseCase(repo, audit);
    await useCase.execute(id, ctx);
    res.status(204).json(apiResponse({ message: 'ExpenseType deleted' }));
}