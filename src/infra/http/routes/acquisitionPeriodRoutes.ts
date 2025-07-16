import { Router } from 'express';
import {
    createAcquisitionPeriod,
    listAcquisitionPeriods,
    updateAcquisitionPeriod,
    deleteAcquisitionPeriod
} from '@/infra/http/controllers/acquisitionPeriodController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createAcquisitionPeriodSchema, updateAcquisitionPeriodSchema } from '@/domain/validations/acquisitionPeriodSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('acquisition-periods', ['write']),
    validate(createAcquisitionPeriodSchema),
    asyncHandler(createAcquisitionPeriod)
);

router.get(
    '/',
    authenticate,
    authorize('acquisition-periods', ['read']),
    asyncHandler(listAcquisitionPeriods)
);

router.put(
    '/:id',
    authenticate,
    authorize('acquisition-periods', ['write']),
    validate(updateAcquisitionPeriodSchema),
    asyncHandler(updateAcquisitionPeriod)
);

router.delete(
    '/:id',
    authenticate,
    authorize('acquisition-periods', ['delete']),
    asyncHandler(deleteAcquisitionPeriod)
);

export default router;