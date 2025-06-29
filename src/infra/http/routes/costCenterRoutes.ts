import { Router } from 'express';
import {
    createCostCenter,
    listCostCenters,
    updateCostCenter,
    deleteCostCenter
} from '@/infra/http/controllers/costCenterController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createCostCenterSchema, updateCostCenterSchema } from '@/domain/validations/costCenterSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('costCenters', ['write']),
    validate(createCostCenterSchema),
    asyncHandler(createCostCenter)
);

router.get(
    '/',
    authenticate,
    authorize('costCenters', ['read']),
    asyncHandler(listCostCenters)
);

router.put(
    '/:id',
    authenticate,
    authorize('costCenters', ['write']),
    validate(updateCostCenterSchema),
    asyncHandler(updateCostCenter)
);

router.delete(
    '/:id',
    authenticate,
    authorize('costCenters', ['delete']),
    asyncHandler(deleteCostCenter)
);

export default router;