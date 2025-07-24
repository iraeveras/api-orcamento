import { Router } from "express";
import { 
    createVacation, 
    updateVacation, 
    listVacations, 
    deleteVacation 
} from "@/infra/http/controllers/vacationsController";
import { authenticateUser } from '@/infra/middlewares/authenticateUser';
import { authorize } from '@/infra/middlewares/authorize';
import { validate } from "@/infra/middlewares/validate";
import { createVacationSchema, updateVacationSchema } from "@/domain/validations/vacationsSchemas";
import { asyncHandler } from '@/shared/utils/asyncHandler';

const router = Router();

router.post("/", authenticateUser, authorize('vacations', ['write']), validate(createVacationSchema), asyncHandler(createVacation));
router.put("/:id", authenticateUser, authorize('vacations', ['write']), validate(updateVacationSchema), asyncHandler(updateVacation));
router.get("/", authenticateUser, authorize('vacations', ['read']), asyncHandler(listVacations));
router.delete("/:id", authenticateUser, authorize('vacations', ['delete']), asyncHandler(deleteVacation));

export default router;