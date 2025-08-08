import { Router } from "express";
import {
    createBudgetPeriod,
    updateBudgetPeriod,
    listBudgetPeriods,
    deleteBudgetPeriod
} from "@/infra/http/controllers/budgetPeriodController";
import { validate } from "@/infra/middlewares/validate";
import { authenticateUser } from "@/infra/middlewares/authenticateUser";
import { authorize } from "@/infra/middlewares/authorize";
import { createBudgetPeriodSchema, updateBudgetPeriodSchema } from "@/domain/validations/budgetPeriodSchemas";
import { asyncHandler } from "@/shared/utils/asyncHandler";

const router = Router();

router.post(
    "/",
    authenticateUser,
    authorize("budgetperiods", ["write"]),
    validate(createBudgetPeriodSchema),
    asyncHandler(createBudgetPeriod)
);

router.get(
    "/",
    authenticateUser,
    authorize("budgetperiods", ["read"]),
    asyncHandler(listBudgetPeriods)
);

router.put(
    "/:id",
    authenticateUser,
    authorize("budgetperiods", ["write"]),
    validate(updateBudgetPeriodSchema),
    asyncHandler(updateBudgetPeriod)
);

router.delete(
    "/:id",
    authenticateUser,
    authorize("budgetperiods", ["delete"]),
    asyncHandler(deleteBudgetPeriod)
);

export default router;