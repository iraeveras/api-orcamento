import { Router } from 'express';
import { createSector, updateSector, listSectors, deleteSector } from '@/infra/http/controllers/sectorController';
import { validate } from '@/infra/middlewares/validate';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createSectorSchema, updateSectorSchema } from '@/domain/validations/sectorSchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post('/', authenticate, authorize('sectors', ['write']), validate(createSectorSchema), asyncHandler(createSector));
router.get('/', authenticate, authorize('sectors', ['read']), asyncHandler(listSectors));
router.put('/:id', authenticate, authorize('sectors', ['write']), validate(updateSectorSchema), asyncHandler(updateSector));
router.delete('/:id', authenticate, authorize('sectors', ['delete']), asyncHandler(deleteSector));

export default router;