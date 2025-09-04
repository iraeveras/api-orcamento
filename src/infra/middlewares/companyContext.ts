// FILE: src/infra/middlewares/companyContext.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Lê o companyId do header X-Company-Id ou da query ?companyId=
 * e injeta em req.companyId.
 */
export function companyContext(req: Request, _res: Response, next: NextFunction): void {
    const headerVal = req.header('x-company-id');
    const queryVal = req.query.companyId as string | undefined;

    const parsed = Number(headerVal ?? queryVal ?? NaN);
    if (!Number.isNaN(parsed) && parsed > 0) {
        req.companyId = parsed; // a augmentação já cobre, é só pra evitar gritaria do TS
    }
    next();
}