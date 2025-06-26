// FILE: src/infra/http/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { createUserUseCase } from '@/domain/usecases/user/createUserUseCase';
import { listUsersUseCase } from '@/domain/usecases/user/listUsersUseCase';
import { updateUserUseCase } from '@/domain/usecases/user/updateUserUseCase';
import { deleteUserUseCase } from '@/domain/usecases/user/deleteUserUseCase';
import { userRepositoryPrisma } from '@/infra/database/prisma/userRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const userRepository = userRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        }
        const useCase = createUserUseCase(userRepository, auditlogRepository);
        const user = await useCase.execute(req.body, context);
        res.status(201).json(apiResponse(user)); // não retorna, só responde
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(apiResponse(null, error.message));
        } else {
            res.status(400).json(apiResponse(null, 'Unexpected error'));
        }
    }
}

export async function listUsers(req: Request, res: Response): Promise<void> {
    try {
        const useCase = listUsersUseCase(userRepository);
        const users = await useCase.execute();
        res.status(200).json(apiResponse(users));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(apiResponse(null, error.message));
        } else {
            res.status(400).json(apiResponse(null, 'Unexpected error'));
        }
    }
}

export async function updadeUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        };

        const useCase = updateUserUseCase(userRepository, auditlogRepository);
        const { id } = req.params;
        const user = await useCase.execute(Number(id), req.body, context);
        res.status(200).json(apiResponse(user));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(apiResponse(null, error.message));
        } else {
            res.status(400).json(apiResponse(null, 'Unexpected error'));
        }
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id,
            ipAddress: req.ip,
        }

        const useCase = deleteUserUseCase(userRepository, auditlogRepository);
        const { id } = req.params;
        await useCase.execute(Number(id), context);
        res.status(204).json(apiResponse({ message: "User deleted" }));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(apiResponse(null, error.message));
        } else {
            res.status(400).json(apiResponse(null, 'Unexpected error'));
        }
    }
}