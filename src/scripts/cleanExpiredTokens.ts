// scripts/cleanExpiredTokens.ts
import prisma from '@/infra/database/prisma/client';

async function cleanExpiredTokens() {
    await prisma.tokenBlacklist.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await prisma.refreshToken.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    console.log('Tokens expirados limpos.');
    process.exit(0);
}

cleanExpiredTokens();