// FILE: src/infra/http/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { createUserUseCase } from '@/domain/usecases/user/createUserUseCase';
import { userRepositoryPrisma } from '@/infra/database/prisma/userRepositoryPrisma';
import { apiResponse } from '@/shared/utils/apiResponse';

const userRepository = userRepositoryPrisma();

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const useCase = createUserUseCase(userRepository);
        const user = await useCase.execute(req.body);
        res.status(201).json(apiResponse(user)); // não retorna, só responde
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(apiResponse(null, error.message));
        } else {
            res.status(400).json(apiResponse(null, 'Unexpected error'));
        }
    }
}