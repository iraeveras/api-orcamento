import { Router } from 'express';
import {
    createAcquisitionPeriod,
    listAcquisitionPeriods,
    updateAcquisitionPeriod,
    deleteAcquisitionPeriod
} from '@/infra/http/controllers/acquisitionPeriodController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createAcquisitionPeriodSchema, updateAcquisitionPeriodSchema } from '@/domain/validations/acquisitionPeriodSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('acquisition-periods', ['write']),
    validate(createAcquisitionPeriodSchema),
    asyncHandler(createAcquisitionPeriod)
);

router.get(
    '/',
    authenticateUser,
    authorize('acquisition-periods', ['read']),
    asyncHandler(listAcquisitionPeriods)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('acquisition-periods', ['write']),
    validate(updateAcquisitionPeriodSchema),
    asyncHandler(updateAcquisitionPeriod)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('acquisition-periods', ['delete']),
    asyncHandler(deleteAcquisitionPeriod)
);

export default router;