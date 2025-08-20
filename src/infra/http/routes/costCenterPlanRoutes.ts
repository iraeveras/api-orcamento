import { Router } from "express";
import {
    createCostCenterPlan,
    updateCostCenterPlan,
    listCostCenterPlans,
    deleteCostCenterPlan,
} from "@/infra/http/controllers/costCenterPlanController";
import { authenticateUser } from "@/infra/middlewares/authenticateUser";
import { authorize } from "@/infra/middlewares/authorize";
import { validate } from "@/infra/middlewares/validate";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import {
    createCostCenterPlanSchema,
    updateCostCenterPlanSchema
} from "@/domain/validations/costCenterPlanSchemas";

const router = Router();

router.post(
    "/",
    authenticateUser,
    authorize("costcenterplans", ["write"]),
    validate(createCostCenterPlanSchema),
    asyncHandler(createCostCenterPlan)
);

router.get(
    "/",
    authenticateUser,
    authorize("costcenterplans", ["read"]),
    asyncHandler(listCostCenterPlans)
);

router.put(
    "/:id",
    authenticateUser,
    authorize("costcenterplans", ["write"]),
    validate(updateCostCenterPlanSchema),
    asyncHandler(updateCostCenterPlan)
);

router.delete(
    "/:id",
    authenticateUser,
    authorize("costcenterplans", ["delete"]),
    asyncHandler(deleteCostCenterPlan)
);

export default router;