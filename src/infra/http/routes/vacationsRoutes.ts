import { Router } from "express";
import { 
    createVacation, 
    updateVacation, 
    listVacations, 
    deleteVacation 
} from "@/infra/http/controllers/vacationsController";
import { validate } from "@/infra/middlewares/validate";
import { authenticate } from '@/infra/middlewares/authenticate';
import { authorize } from '@/infra/middlewares/authorize';
import { createVacationSchema, updateVacationSchema } from "@/domain/validations/vacationsSchemas";
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post("/", authenticate, authorize('vacations', ['write']), validate(createVacationSchema), asyncHandler(createVacation));
router.put("/:id", authenticate, authorize('vacations', ['write']), validate(updateVacationSchema), asyncHandler(updateVacation));
router.get("/", authenticate, authorize('vacations', ['read']), asyncHandler(listVacations));
router.delete("/:id", authenticate, authorize('vacations', ['delete']), asyncHandler(deleteVacation));

export default router;