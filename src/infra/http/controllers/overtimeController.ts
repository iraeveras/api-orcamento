import { Request, Response } from 'express';
import { overtimeRepositoryPrisma } from '@/infra/database/prisma/overtimeRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { createOvertimeUseCase } from '@/domain/usecases/overtime/createOvertimeUseCase';
import { updateOvertimeUseCase } from '@/domain/usecases/overtime/updateOvertimeUseCase';
import { listOvertimeUseCase } from '@/domain/usecases/overtime/listOvertimeUseCase';
import { deleteOvertimeUseCase } from '@/domain/usecases/overtime/deleteOvertimeUseCase';
import { apiResponse } from '@/shared/utils/apiResponse';

const repo = overtimeRepositoryPrisma();
const audit = auditlogRepositoryPrisma();

export async function createOvertime(req: Request, res: Response) {
    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };
    const uc = createOvertimeUseCase(repo, audit);
    const overtime = await uc.execute(req.body, context);
    res.status(201).json(apiResponse(overtime));
}

export async function updateOvertime(req: Request, res: Response) {
    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };
    const { id } = req.params;
    const uc = updateOvertimeUseCase(repo, audit);
    const overtime = await uc.execute(Number(id), req.body, context);
    res.status(200).json(apiResponse(overtime));
}

export async function listOvertime(req: Request, res: Response) {
    const uc = listOvertimeUseCase(repo);
    const list = await uc.execute();
    res.status(200).json(apiResponse(list));
}

export async function deleteOvertime(req: Request, res: Response) {
    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };
    const { id } = req.params;
    const uc = deleteOvertimeUseCase(repo, audit);
    await uc.execute(Number(id), context);
    res.status(204).json(apiResponse({ message: 'Overtime deleted' }));
}