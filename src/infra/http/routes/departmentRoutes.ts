// FILE: src/infra/http/routes/departmentRoutes.ts
import { Router } from 'express';
import {
    createDepartment,
    updateDepartment,
    listDepartments,
    deleteDepartment,
} from '@/infra/http/controllers/departmentController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import {
    createDepartmentSchema,
    updateDepartmentSchema,
} from '@/domain/validations/departmentSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { companyContext } from '@/infra/middlewares/companyContext';
import { ensureCompanyInBodyOrContext } from '@/infra/middlewares/ensureSameCompany';

const router = Router();

// Aplica o contexto de empresa para todas as rotas deste recurso
router.use(companyContext);

router.post(
    '/',
    authenticateUser,
    authorize('departments', ['write']),
    ensureCompanyInBodyOrContext(true),   // força body.companyId = req.companyId
    validate(createDepartmentSchema),
    asyncHandler(createDepartment)
);

router.get(
    '/',
    authenticateUser,
    authorize('departments', ['read']),
    asyncHandler(listDepartments)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('departments', ['write']),
    ensureCompanyInBodyOrContext(false),  // se vier companyId no body, deve bater com o contexto
    validate(updateDepartmentSchema),
    asyncHandler(updateDepartment)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('departments', ['delete']),
    asyncHandler(deleteDepartment)
);

export default router;