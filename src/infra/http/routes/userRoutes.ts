// src/infra/http/routes/userRoutes.ts
import { Router } from 'express';
import { createUser } from '@/infra/http/controllers/userController';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(createUser));

export default router;