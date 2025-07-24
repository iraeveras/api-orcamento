// FILE: src/infra/http/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, listUsers, updateUser, deleteUser, forgotPassword, resetPassword, login, logout, getMe, refreshToken } from '@/infra/http/controllers/userController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createUserSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@/domain/validations/userSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/logout', authenticateUser, asyncHandler(logout));
router.post('/refresh-token', refreshToken);
router.get('/me', authenticateUser, asyncHandler(getMe));
router.post('/forgot-password', validate(forgotPasswordSchema), asyncHandler(forgotPassword));
router.post('/reset-password', validate(resetPasswordSchema), asyncHandler(resetPassword));

router.post('/', authenticateUser, authorize('users', ['write']), validate(createUserSchema), asyncHandler(createUser));
router.get('/', authenticateUser, authorize('users', ['read']), asyncHandler(listUsers));
router.put('/:id', authenticateUser, authorize('users', ['write']), asyncHandler(updateUser));
router.delete('/:id', authenticateUser, authorize('users', ['delete']), asyncHandler(deleteUser));

export default router;