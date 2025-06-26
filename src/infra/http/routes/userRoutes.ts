// src/infra/http/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, listUsers, updateUser, deleteUser, forgotPassword, resetPassword, login } from '@/infra/http/controllers/userController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createUserSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@/domain/validations/userSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('reset-password', validate(resetPasswordSchema), resetPassword)

router.post('/', authenticate, authorize('users', ['write']), validate(createUserSchema), asyncHandler(createUser));
router.get('/', authenticate, authorize('users', ['read']), asyncHandler(listUsers));
router.put('/:id', authenticate, authorize('users', ['write']), asyncHandler(updateUser));
router.delete('/:id', authenticate, authorize('users', ['delete']), asyncHandler(deleteUser));

export default router;