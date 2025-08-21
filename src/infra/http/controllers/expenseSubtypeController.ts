// FILE: src/infra/http/controllers/expenseSubtypeController.ts
import { Request, Response } from 'express';
import { apiResponse } from '@/shared/utils/apiResponse';
import { expenseSubtypeRepositoryPrisma } from '@/infra/database/prisma/expenseSubtypeRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { createExpenseSubtypeUseCase } from '@/domain/usecases/expenseSubtype/createExpenseSubtypeCase';
import { updateExpenseSubtypeUseCase } from '@/domain/usecases/expenseSubtype/updateExpenseSubtypeCase';
import { listExpenseSubtypeUseCase } from '@/domain/usecases/expenseSubtype/listExpenseSubtypeCase';
import { deleteExpenseSubtypeUseCase } from '@/domain/usecases/expenseSubtype/deleteExpenseSubtypeCase';

const repo = expenseSubtypeRepositoryPrisma();
const audit = auditlogRepositoryPrisma();

export async function createExpenseSubtype(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const useCase = createExpenseSubtypeUseCase(repo, audit);
    const created = await useCase.execute(req.body, ctx);
    res.status(201).json(apiResponse(created));
}

export async function updateExpenseSubtype(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = updateExpenseSubtypeUseCase(repo, audit);
    const updated = await useCase.execute(id, req.body, ctx);
    res.status(200).json(apiResponse(updated));
}

export async function listExpenseSubtypes(req: Request, res: Response) {
    const useCase = listExpenseSubtypeUseCase(repo);
    const filters = {
        tipoDespesaId: req.query.tipoDespesaId ? Number(req.query.tipoDespesaId) : undefined,
        status: (req.query.status as 'active' | 'inactive') || undefined,
        search: (req.query.search as string) || undefined,
    };
    const data = await useCase.execute(filters);
    res.status(200).json(apiResponse(data));
}

export async function deleteExpenseSubtype(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const id = Number(req.params.id);
    const useCase = deleteExpenseSubtypeUseCase(repo, audit);
    await useCase.execute(id, ctx);
    res.status(204).json(apiResponse({ message: 'ExpenseSubtype deleted' }));
}