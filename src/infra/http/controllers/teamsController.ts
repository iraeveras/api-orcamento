// FILE: src/infra/http/controllers/teamsController.ts
import { Request, Response } from 'express';
import { createTeamsUseCase } from '@/domain/usecases/teams/createTeamsUseCase';
import { updateTeamsUseCase } from '@/domain/usecases/teams/updateTeamsUseCase';
import { listTeamsUseCase } from '@/domain/usecases/teams/listTeamsUseCase';
import { deleteTeamsUseCase } from '@/domain/usecases/teams/deleteTeamsUseCase';
import { teamsRepositoryPrisma } from '@/infra/database/prisma/teamsRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const teamsRepository = teamsRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createTeam(req: Request, res: Response) {
    if (!req.companyId) {
        res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
        return;
    }

    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };

    // middleware já garante body.companyId === req.companyId;
    const payload = { ...req.body, companyId: req.companyId };

    const useCase = createTeamsUseCase(teamsRepository, auditlogRepository);
    const team = await useCase.execute(payload, context);
    res.status(201).json(apiResponse(team));
}

export async function updateTeam(req: Request, res: Response) {
    if (!req.companyId) {
        res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
        return;
    }

    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };
    const { id } = req.params;

    const useCase = updateTeamsUseCase(teamsRepository, auditlogRepository);
    const team = await useCase.execute(Number(id), req.companyId, req.body, context);
    res.status(200).json(apiResponse(team));
}

export async function listTeams(req: Request, res: Response) {
    if (!req.companyId) {
        res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
        return;
    }
    const useCase = listTeamsUseCase(teamsRepository);
    const teams = await useCase.execute(req.companyId);
    res.status(200).json(apiResponse(teams));
}

export async function deleteTeam(req: Request, res: Response) {
    if (!req.companyId) {
        res.status(400).json(apiResponse(null, 'Missing X-Company-Id'));
        return;
    }

    const context = {
        userId: req.user?.id || 0,
        ipAddress: req.ip || '',
    };
    const { id } = req.params;

    const useCase = deleteTeamsUseCase(teamsRepository, auditlogRepository);
    await useCase.execute(Number(id), req.companyId, context);
    res.status(204).json(apiResponse({ message: 'Team deleted' }));
}