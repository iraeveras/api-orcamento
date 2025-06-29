import { Router } from 'express';
import { createDepartment, updateDepartment, listDepartments, deleteDepartment } from '@/infra/http/controllers/departmentController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createDepartmentSchema, updateDepartmentSchema } from '@/domain/validations/departmentSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', authenticate, authorize('departments', ['write']), validate(createDepartmentSchema), asyncHandler(createDepartment));
router.get('/', authenticate, authorize('departments', ['read']), asyncHandler(listDepartments));
router.put('/:id', authenticate, authorize('departments', ['write']), validate(updateDepartmentSchema), asyncHandler(updateDepartment));
router.delete('/:id', authenticate, authorize('departments', ['delete']), asyncHandler(deleteDepartment));

export default router;