// FILE: src/infra/middlewares/ensureSameCompany.ts
import { Request, Response, NextFunction } from 'express';

export function ensureCompanyInBodyOrContext(requiredOnCreate = true) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const ctxCompany = req.companyId;
        const bodyCompany = (req.body?.companyId ?? undefined) as number | undefined;

        if (!ctxCompany) {
            res.status(400).json({ data: null, error: 'Missing X-Company-Id' });
            return;
        }

        // Em CREATE: força body.companyId = contexto
        if (requiredOnCreate && req.method === 'POST') {
            req.body = { ...req.body, companyId: ctxCompany };
        }

        // Em UPDATE: se body trouxer companyId, deve coincidir
        if (req.method === 'PUT' || req.method === 'PATCH') {
            if (bodyCompany !== undefined && bodyCompany !== ctxCompany) {
                res.status(403).json({ data: null, error: 'companyId mismatch' });
                return;
            }
        }

        next();
    };
}