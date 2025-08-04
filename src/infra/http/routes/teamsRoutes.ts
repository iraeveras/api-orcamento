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

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('teams', ['write']),
    validate(createTeamSchema),
    asyncHandler(createTeam)
);
router.get(
    '/',
    authenticateUser,
    authorize('teams', ['read']),
    asyncHandler(listTeams)
);
router.put(
    '/:id',
    authenticateUser,
    authorize('teams', ['write']),
    validate(updateTeamSchema),
    asyncHandler(updateTeam)
);
router.delete(
    '/:id',
    authenticateUser,
    authorize('teams', ['delete']),
    asyncHandler(deleteTeam)
);

export default router;