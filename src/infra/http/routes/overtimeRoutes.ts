import { Router } from 'express';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { createOvertimeSchema, updateOvertimeSchema } from '@/domain/validations/overtimeSchemas';
import {
    createOvertime,
    updateOvertime,
    listOvertime,
    deleteOvertime,
} from '@/infra/http/controllers/overtimeController';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('overtimes', ['write']),
    validate(createOvertimeSchema),
    asyncHandler(createOvertime),
);

router.get(
    '/',
    authenticateUser,
    authorize('overtimes', ['read']),
    asyncHandler(listOvertime),
);

router.put(
    '/:id',
    authenticateUser,
    authorize('overtimes', ['write']),
    validate(updateOvertimeSchema),
    asyncHandler(updateOvertime),
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('overtimes', ['delete']),
    asyncHandler(deleteOvertime),
);

export default router;