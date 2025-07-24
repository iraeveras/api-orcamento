import { Router } from 'express';
import { createDepartment, updateDepartment, listDepartments, deleteDepartment } from '@/infra/http/controllers/departmentController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createDepartmentSchema, updateDepartmentSchema } from '@/domain/validations/departmentSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', authenticateUser, authorize('departments', ['write']), validate(createDepartmentSchema), asyncHandler(createDepartment));
router.get('/', authenticateUser, authorize('departments', ['read']), asyncHandler(listDepartments));
router.put('/:id', authenticateUser, authorize('departments', ['write']), validate(updateDepartmentSchema), asyncHandler(updateDepartment));
router.delete('/:id', authenticateUser, authorize('departments', ['delete']), asyncHandler(deleteDepartment));

export default router;