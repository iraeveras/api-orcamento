import { Router } from 'express';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { asyncHandler } from '@/shared/utils/asyncHandler';

import {
    createExpenseType,
    updateExpenseType,
    listExpenseTypes,
    deleteExpenseType,
} from '@/infra/http/controllers/expenseTypeController';

import {
    createExpenseTypeSchema,
    updateExpenseTypeSchema,
} from '@/domain/validations/expenseTypeSchemas';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('expensetypes', ['write']),
    validate(createExpenseTypeSchema),
    asyncHandler(createExpenseType)
);

router.get(
    '/',
    authenticateUser,
    authorize('expensetypes', ['read']),
    asyncHandler(listExpenseTypes)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('expensetypes', ['write']),
    validate(updateExpenseTypeSchema),
    asyncHandler(updateExpenseType)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('expensetypes', ['delete']),
    asyncHandler(deleteExpenseType)
);

export default router;