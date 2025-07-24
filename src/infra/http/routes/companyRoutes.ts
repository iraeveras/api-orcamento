import { Router } from 'express';
import { createCompany, listCompanies, updateCompany, deleteCompany } from '@/infra/http/controllers/companyController';
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from '@/infra/middlewares/validate';
import { createCompanySchema } from '@/domain/validations/companySchemas';
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post(
    '/', 
    authenticateUser, 
    authorize('companies', ['write']),
    validate(createCompanySchema),
    asyncHandler(createCompany)
);

router.get(
    '/',
    authenticateUser,
    authorize('companies', ['read']),
    asyncHandler(listCompanies)
);

router.put(
    '/:id',
    authenticateUser,
    authorize('companies', ['write']),
    asyncHandler(updateCompany)
);

router.delete(
    '/:id',
    authenticateUser,
    authorize('companies', ['delete']),
    asyncHandler(deleteCompany)
);

export default router;
