// src/infra/middlewares/authenticateUser.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@/infra/database/prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey12345!@';

export interface AuthUserPayload {
    id: number;
    email: string;
    roleId: number;
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    // Tenta pegar token do cookie (padrão) ou do header Authorization (para APIs)
    const token = req.cookies['token'] || (req.headers.authorization?.replace('Bearer ', '') ?? null);
    if (!token) {
        console.warn("Token não informado na requisição");
        res.status(401).json({ error: 'Token não informado' });
        return
    };

    // Blacklist check
    const isBlacklisted = await prisma.tokenBlacklist.findUnique({ where: { token } });
    if (isBlacklisted) {
        console.warn(`Token revogado encontrado na blacklist para usuário ${req.user?.id}`);
        res.status(401).json({ error: "Token revogado" });
        return
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET) as AuthUserPayload;

        // Sempre busca dados do usuário atualizado no banco!
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { role: { include: { permissions: true } }, companies: { include: { company: true } } }
        });
        if (!user) {
            console.warn(`Usuário não encontrado no banco com id ${decoded.id}`);
            res.status(401).json({ error: "Usuário não encontrado" });
            return
        }

        req.user = user;
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "Sessão expirada. Faça login novamente." });
            return
        }
        console.error("Erro na verificação do token JWT:", error);
        res.status(401).json({ error: 'Token inválido ou expirado' });
        return
    }
}
