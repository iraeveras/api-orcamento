// FILE: src/infra/middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@/infra/database/prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey12345!@';

export interface AuthUserPayload {
    id: number;
    email: string;
    roleId: number;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'Token não informado' });
        return;
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthUserPayload;
        // Carrega usuário + role + permissões do banco para o req.user
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { role: { include: { permissions: true } } }
        });
        if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
            return;
        }
        req.user = user; // Estenda a tipagem do Request em um arquivo global.d.ts se quiser autocomplete!
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}
