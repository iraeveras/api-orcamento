import { Router } from 'express';
import {
    createCostCenter,
    listCostCenters,
    updateCostCenter,
    deleteCostCenter
} from '@/infra/http/controllers/costCenterController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createCostCenterSchema, updateCostCenterSchema } from '@/domain/validations/costCenterSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('costCenters', ['write']),
    validate(createCostCenterSchema),
    asyncHandler(createCostCenter)
);

router.get(
    '/',
    authenticateUser,
    authorize('costCenters', ['read']),
    asyncHandler(listCostCenters)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('costCenters', ['write']),
    validate(updateCostCenterSchema),
    asyncHandler(updateCostCenter)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('costCenters', ['delete']),
    asyncHandler(deleteCostCenter)
);

export default router;