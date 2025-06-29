import { Router } from 'express';
import { createCompany, listCompanies, updateCompany, deleteCompany } from '@/infra/http/controllers/companyController';
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createCompanySchema } from '@/domain/validations/companySchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/', 
    authenticate, 
    authorize('companies', ['write']),
    validate(createCompanySchema),
    asyncHandler(createCompany)
);

router.get(
    '/',
    authenticate,
    authorize('companies', ['read']),
    asyncHandler(listCompanies)
);

router.put(
    '/:id',
    authenticate,
    authorize('companies', ['write']),
    asyncHandler(updateCompany)
);

router.delete(
    '/:id',
    authenticate,
    authorize('companies', ['delete']),
    asyncHandler(deleteCompany)
);

export default router;
