// FILE: src/infra/http/routes/sectorRoutes.ts
import { Router } from 'express';
import { createSector, updateSector, listSectors, deleteSector } from '@/infra/http/controllers/sectorController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createSectorSchema, updateSectorSchema } from '@/domain/validations/sectorSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { companyContext } from '@/infra/middlewares/companyContext';
import { ensureCompanyInBodyOrContext } from '@/infra/middlewares/ensureSameCompany';

const router = Router();

// injeta req.companyId a partir do header/query
router.use(companyContext);

router.post(
    '/',
    authenticateUser,
    authorize('sectors', ['write']),
    ensureCompanyInBodyOrContext(true),   // força body.companyId = req.companyId ANTES do validate
    validate(createSectorSchema),
    asyncHandler(createSector),
);

router.get(
    '/',
    authenticateUser,
    authorize('sectors', ['read']),
    asyncHandler(listSectors),
);

router.put(
    '/:id',
    authenticateUser,
    authorize('sectors', ['write']),
    ensureCompanyInBodyOrContext(false),  // valida se veio companyId no body, precisa coincidir (se enviado)
    validate(updateSectorSchema),
    asyncHandler(updateSector),
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('sectors', ['delete']),
    asyncHandler(deleteSector),
);

export default router;