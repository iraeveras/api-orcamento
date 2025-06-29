import { Request, Response } from 'express';
import { createSectorUseCase } from '@/domain/usecases/sector/createSectorUseCase';
import { updateSectorUseCase } from '@/domain/usecases/sector/updateSectorUseCase';
import { listSectorUseCase } from '@/domain/usecases/sector/listSectorUseCase';
import { deleteSectorUseCase } from '@/domain/usecases/sector/deleteSectorUseCase';
import { sectorRepositoryPrisma } from '@/infra/database/prisma/sectorRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const sectorRepository = sectorRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createSector(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = createSectorUseCase(sectorRepository, auditlogRepository);
        const sector = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(sector));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function updateSector(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = updateSectorUseCase(sectorRepository, auditlogRepository);
        const { id } = req.params;
        const sector = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(sector));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function listSectors(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listSectorUseCase(sectorRepository);
        const sectors = await useCase.execute();
        res.status(200).json(apiResponse(sectors));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function deleteSector(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteSectorUseCase(sectorRepository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), context);
        res.status(204).json(apiResponse({ message: 'Sector deleted' }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}
