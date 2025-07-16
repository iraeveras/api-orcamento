import { Request, Response } from 'express';
import { createAcquisitionPeriodUseCase } from '@/domain/usecases/acquisitionPeriod/createAcquisitionPeriodUseCase';
import { updateAcquisitionPeriodUseCase } from '@/domain/usecases/acquisitionPeriod/updateAcquisitionPeriodUseCase';
import { listAcquisitionPeriodUseCase } from '@/domain/usecases/acquisitionPeriod/listAcquisitionPeriodUseCase';
import { deleteAcquisitionPeriodUseCase } from '@/domain/usecases/acquisitionPeriod/deleteAcquisitionPeriodUseCase';
import { acquisitionPeriodRepositoryPrisma } from '@/infra/database/prisma/acquisitionPeriodRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const repository = acquisitionPeriodRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createAcquisitionPeriod(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = createAcquisitionPeriodUseCase(repository, auditlogRepository);
        const result = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(result));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateAcquisitionPeriod(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = updateAcquisitionPeriodUseCase(repository, auditlogRepository);
        const { id } = req.params;
        const result = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(result));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listAcquisitionPeriods(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listAcquisitionPeriodUseCase(repository);
        const result = await useCase.execute();
        res.status(200).json(apiResponse(result));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteAcquisitionPeriod(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteAcquisitionPeriodUseCase(repository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), context);
        res.status(204).json(apiResponse({ message: "AcquisitionPeriod deleted" }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}