import { Router } from 'express';
import {
    createEmployee,
    listEmployees,
    updateEmployee,
    deleteEmployee
} from '@/infra/http/controllers/employeeController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createEmployeeSchema, updateEmployeeSchema } from '@/domain/validations/employeeSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('employees', ['write']),
    validate(createEmployeeSchema),
    asyncHandler(createEmployee)
);

router.get(
    '/',
    authenticate,
    authorize('employees', ['read']),
    asyncHandler(listEmployees)
);

router.put(
    '/:id',
    authenticate,
    authorize('employees', ['write']),
    validate(updateEmployeeSchema),
    asyncHandler(updateEmployee)
);

router.delete(
    '/:id',
    authenticate,
    authorize('employees', ['delete']),
    asyncHandler(deleteEmployee)
);

export default router;