// FILE: src/infra/http/routes/employeeRoutes.ts
import { Router } from 'express';
import {
    createEmployee,
    listEmployees,
    updateEmployee,
    deleteEmployee
} from '@/infra/http/controllers/employeeController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createEmployeeSchema, updateEmployeeSchema } from '@/domain/validations/employeeSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ensureCompanyInBodyOrContext } from '@/infra/middlewares/ensureSameCompany';

const router = Router();

router.post(
    '/',
    authenticateUser,
    authorize('employees', ['write']),
    ensureCompanyInBodyOrContext(true),
    validate(createEmployeeSchema),
    asyncHandler(createEmployee)
);

router.get(
    '/',
    authenticateUser,
    authorize('employees', ['read']),
    asyncHandler(listEmployees)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('employees', ['write']),
    ensureCompanyInBodyOrContext(false),
    validate(updateEmployeeSchema),
    asyncHandler(updateEmployee)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('employees', ['delete']),
    asyncHandler(deleteEmployee)
);

export default router;