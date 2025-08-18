// FILE: src/infra/http/controllers/vacationsController.ts
import { Request, Response } from "express";
import { createVacationUseCase } from "@/domain/usecases/vacations/createVacationCase";
import { updateVacationUseCase } from "@/domain/usecases/vacations/updateVacationCase";
import { listVacationsUseCase } from "@/domain/usecases/vacations/listVacationsCase";
import { deleteVacationUseCase } from "@/domain/usecases/vacations/deleteVacationCase";
import { vacationsRepositoryPrisma } from "@/infra/database/prisma/vacationsRepositoryPrisma";
import { auditlogRepositoryPrisma } from "@/infra/database/prisma/auditlogRepositoryPrisma";
import { apiResponse } from "@/shared/utils/apiResponse";

const vacationsRepository = vacationsRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export const createVacation = async (req: Request, res: Response) => {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = createVacationUseCase(vacationsRepository, auditlogRepository);
        const vacation = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(vacation));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const updateVacation = async (req: Request, res: Response) => {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = updateVacationUseCase(vacationsRepository, auditlogRepository);
        const vacation = await useCase.execute(Number(req.params.id), req.body, context);
        res.json(apiResponse(vacation));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const listVacations = async (req: Request, res: Response) => {
    try {
        const useCase = listVacationsUseCase(vacationsRepository);
        const vacations = await useCase.execute();
        res.json(apiResponse(vacations));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
};

export const deleteVacation = async (req: Request, res: Response) => {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
        };
        const useCase = deleteVacationUseCase(vacationsRepository, auditlogRepository);
        const deleted = await useCase.execute(Number(req.params.id), context);
        res.json(apiResponse({ deleted }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
};