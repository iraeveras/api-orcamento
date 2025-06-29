// FILE: src/infra/http/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { createUserUseCase } from '@/domain/usecases/user/createUserUseCase';
import { listUsersUseCase } from '@/domain/usecases/user/listUsersUseCase';
import { updateUserUseCase } from '@/domain/usecases/user/updateUserUseCase';
import { deleteUserUseCase } from '@/domain/usecases/user/deleteUserUseCase';
import { userRepositoryPrisma } from '@/infra/database/prisma/userRepositoryPrisma';
import { auditlogRepositoryPrisma } from '@/infra/database/prisma/auditlogRepositoryPrisma';
import prisma from '@/infra/database/prisma/client';
import { apiResponse } from '@/shared/utils/apiResponse';

const userRepository = userRepositoryPrisma();
const auditlogRepository = auditlogRepositoryPrisma();
const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey12345!@';
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: { include: { permissions: true } } }
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json(apiResponse(null, 'Usuário ou senha inválidos'));
            return;
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, roleId: user.roleId },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Log de autenticação (auditlog)
        await auditlogRepository.log({
            userId: user.id,
            action: 'login',
            entity: 'User',
            entityId: String(user.id),
            newData: { email: user.email },
            ipAddress: req.ip
        });

        res.json(apiResponse({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token
        }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        }
        const userData = { ...req.body, password: await bcrypt.hash(req.body.password, SALT_ROUNDS) };
        const useCase = createUserUseCase(userRepository, auditlogRepository);
        const user = await useCase.execute(userData, context);
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

export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip,
        };

        const { password, ...updateData } = req.body;

        if (password) {
            updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
        }

        const useCase = updateUserUseCase(userRepository, auditlogRepository);
        const { id } = req.params;
        const user = await useCase.execute(Number(id), updateData, context);
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

// INICIAR RECUPERAÇÃO DE SENHA
export async function forgotPassword(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json(apiResponse(null, 'E-mail não encontrado'));
            return;
        }
        // Gera um token simples (ideal: criar tabela password_reset_token)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min
        await prisma.passwordResetToken.create({
            data: { userId: user.id, token: resetToken, expiresAt: expires }
        });

        // AUDIT LOG
        await auditlogRepository.log({
            userId: user.id,
            action: 'forgot-password',
            entity: 'User',
            entityId: String(user.id),
            newData: { email: user.email },
            ipAddress: req.ip
        });

        // Envie e-mail para user.email (mock ou integração com serviço de email)
        // ...
        res.status(200).json(apiResponse({ message: 'Se o e-mail estiver cadastrado, será enviado um link de recuperação.' }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

// RESETAR SENHA
export async function resetPassword(req: Request, res: Response): Promise<void> {
    try {
        const { token, password } = req.body;
        const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
        if (!reset || reset.expiresAt < new Date()) {
            res.status(400).json(apiResponse(null, 'Token inválido ou expirado'));
            return;
        }
        await prisma.user.update({
            where: { id: reset.userId },
            data: { password: await bcrypt.hash(password, SALT_ROUNDS) }
        });

        // AUDIT LOG
        const user = await prisma.user.findUnique({ where: { id: reset.userId } });
        await auditlogRepository.log({
            userId: reset.userId,
            action: 'reset-password',
            entity: 'User',
            entityId: String(reset.userId),
            newData: { email: user?.email },
            ipAddress: req.ip
        });
        
        await prisma.passwordResetToken.delete({ where: { token } });
        res.status(200).json(apiResponse({ message: 'Senha redefinida com sucesso.' }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}