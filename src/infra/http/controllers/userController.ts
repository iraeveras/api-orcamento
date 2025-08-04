// FILE: src/infra/http/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
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
const ACCESS_TOKEN_EXP = '12h';
const REFRESH_TOKEN_EXP_DAYS = 7;

function getRefreshTokenExpires() {
  return new Date(Date.now() + REFRESH_TOKEN_EXP_DAYS * 12 * 60 * 60 * 1000);
}

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
        // Access Token
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, roleId: user.roleId },
            JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_EXP }
        );

        // Refresh Token
        const refreshToken = crypto.randomBytes(64).toString('hex');
        const refreshExpires = getRefreshTokenExpires();
        await prisma.refreshToken.create({
            data: { token: refreshToken, userId: user.id, expiresAt: refreshExpires }
        });

        // Set cookies
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 12 * 60 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: REFRESH_TOKEN_EXP_DAYS * 12 * 60 * 60 * 1000
        });

        // Log de autenticação (auditlog)
        await auditlogRepository.log({
            userId: user.id,
            action: 'login',
            entity: 'User',
            entityId: String(user.id),
            newData: { email: user.email },
            ipAddress: req.ip
        });

        res.status(200).json(apiResponse({ message: "Login realizado com sucesso" }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

// LOGOUT
export async function logout(req: Request, res: Response) {
    const token = req.cookies['token'];
    const refreshToken = req.cookies['refreshToken'];
    if (token) {
        // Pega exp do token JWT para registrar expiração
        const decoded: any = jwt.decode(token);
        const expiresAt = new Date((decoded?.exp || 0) * 1000);
        await prisma.tokenBlacklist.create({
            data: { token, userId: req.user?.id || 0, expiresAt }
        });
    }
    if (refreshToken) {
        await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Logout realizado com sucesso" });
}

// REFRESH TOKEN
export async function refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({ error: "Refresh token não informado" });
        return
    }

    const found = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!found || found.expiresAt < new Date()) {
        res.status(401).json({ error: "Refresh token inválido ou expirado" });
        return
    }
    const user = await prisma.user.findUnique({ where: { id: found.userId } });
    if (!user) {
        res.status(401).json({ error: "Usuário não encontrado" });
        return
    }

    // Novo access token
    const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, roleId: user.roleId },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXP }
    );
    res.cookie('token', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 12 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Token renovado com sucesso" });
}

export async function getMe(req: Request, res: Response): Promise<void> {
    try {
        // req.user é populado pelo authenticateToken
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { role: { include: { permissions: true } }, companies: { include: { company: true } } }
        });
        if (!user) {
            res.status(404).json(apiResponse(null, "Usuário não encontrado"));
            return
        }
        res.status(200).json(apiResponse({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            TokenExpiredError: req.user.exp ? req.user.exp * 1000 : null,
            companies: user.companies?.map(c => c.company) ?? [],
            status: user.status
        }));
    } catch (error) {
        res.status(400).json(apiResponse(null, error instanceof Error ? error.message : 'Unexpected error'));
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const context = {
            userId: req.user?.id || 0,
            ipAddress: req.ip || '',
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
            ipAddress: req.ip || '',
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
            ipAddress: req.ip || '',
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