import { Router } from 'express';
import { createSector, updateSector, listSectors, deleteSector } from '@/infra/http/controllers/sectorController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createSectorSchema, updateSectorSchema } from '@/domain/validations/sectorSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', authenticateUser, authorize('sectors', ['write']), validate(createSectorSchema), asyncHandler(createSector));
router.get('/', authenticateUser, authorize('sectors', ['read']), asyncHandler(listSectors));
router.put('/:id', authenticateUser, authorize('sectors', ['write']), validate(updateSectorSchema), asyncHandler(updateSector));
router.delete('/:id', authenticateUser, authorize('sectors', ['delete']), asyncHandler(deleteSector));

export default router;