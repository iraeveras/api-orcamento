import { Router } from 'express';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { asyncHandler } from '@/shared/utils/asyncHandler';

import {
    createExpenseSubtype,
    updateExpenseSubtype,
    listExpenseSubtypes,
    deleteExpenseSubtype,
} from '@/infra/http/controllers/expenseSubtypeController';

import {
    createExpenseSubtypeSchema,
    updateExpenseSubtypeSchema,
} from '@/domain/validations/expenseSubtypeSchemas';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('expensesubtypes', ['write']),
    validate(createExpenseSubtypeSchema),
    asyncHandler(createExpenseSubtype)
);

router.get(
    '/',
    authenticateUser,
    authorize('expensesubtypes', ['read']),
    asyncHandler(listExpenseSubtypes)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('expensesubtypes', ['write']),
    validate(updateExpenseSubtypeSchema),
    asyncHandler(updateExpenseSubtype)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('expensesubtypes', ['delete']),
    asyncHandler(deleteExpenseSubtype)
);

export default router;