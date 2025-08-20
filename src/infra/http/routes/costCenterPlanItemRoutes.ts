import { Router } from 'express';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import {
    createCostCenterPlanItem,
    updateCostCenterPlanItem,
    listCostCenterPlanItems,
    deleteCostCenterPlanItem,
} from '@/infra/http/controllers/costCenterPlanItemController';
import {
    createCostCenterPlanItemSchema,
    updateCostCenterPlanItemSchema,
} from '@/domain/validations/costCenterPlanItemSchemas';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('costcenterplanitems', ['write']),
    validate(createCostCenterPlanItemSchema),
    asyncHandler(createCostCenterPlanItem)
);

router.get(
    '/',
    authenticateUser,
    authorize('costcenterplanitems', ['read']),
    asyncHandler(listCostCenterPlanItems)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('costcenterplanitems', ['write']),
    validate(updateCostCenterPlanItemSchema),
    asyncHandler(updateCostCenterPlanItem)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('costcenterplanitems', ['delete']),
    asyncHandler(deleteCostCenterPlanItem)
);

export default router;