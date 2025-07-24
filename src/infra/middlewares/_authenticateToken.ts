// FILE: src/infra/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@/infra/database/prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey12345!@';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];
    if (!token) {
        res.status(401).json({ error: "Token não informado" });
        return
    } 

    // Blacklist check
    const isBlacklisted = await prisma.tokenBlacklist.findUnique({ where: { token } });
    if (isBlacklisted) {
        res.status(401).json({ error: "Token revogado" }); 
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido ou expirado" });
        return
    }
}