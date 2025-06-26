// src/infra/http/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, listUsers, updadeUser, deleteUser } from '@/infra/http/controllers/userController';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(createUser));
router.get('/', asyncHandler(listUsers));
router.put('/:id', asyncHandler(updadeUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;