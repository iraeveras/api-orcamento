import { Router } from 'express';
import {
    createTeam,
    updateTeam,
    listTeams,
    deleteTeam
} from '@/infra/http/controllers/teamsController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createTeamSchema, updateTeamSchema } from '@/domain/validations/teamsSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('teams', ['write']),
    validate(createTeamSchema),
    asyncHandler(createTeam)
);
router.get(
    '/',
    authenticate,
    authorize('teams', ['read']),
    asyncHandler(listTeams)
);
router.put(
    '/:id',
    authenticate,
    authorize('teams', ['write']),
    validate(updateTeamSchema),
    asyncHandler(updateTeam)
);
router.delete(
    '/:id',
    authenticate,
    authorize('teams', ['delete']),
    asyncHandler(deleteTeam)
);

export default router;