// FILE: src/infra/http/routes/teamsRoutes.ts
import { Router } from 'express';
import {
    createTeam,
    updateTeam,
    listTeams,
    deleteTeam
} from '@/infra/http/controllers/teamsController';
import { validate } from '@/infra/middlewares/validate';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { createTeamSchema, updateTeamSchema } from '@/domain/validations/teamsSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { companyContext } from '@/infra/middlewares/companyContext';
import { ensureCompanyInBodyOrContext } from '@/infra/middlewares/ensureSameCompany';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('teams', ['write']),
    companyContext,
    ensureCompanyInBodyOrContext(true),
    validate(createTeamSchema),
    asyncHandler(createTeam)
);

router.get(
    '/',
    authenticateUser,
    authorize('teams', ['read']),
    companyContext,
    asyncHandler(listTeams)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('teams', ['write']),
    companyContext,
    ensureCompanyInBodyOrContext(false),
    validate(updateTeamSchema),
    asyncHandler(updateTeam)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('teams', ['delete']),
    companyContext,
    asyncHandler(deleteTeam)
);

export default router;