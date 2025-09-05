// FILE: src/infra/http/routes/costCenterPlanRoutes.ts
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
import { companyContext } from "@/infra/middlewares/companyContext";
import { ensureCompanyInBodyOrContext } from "@/infra/middlewares/ensureSameCompany";

const router = Router();

router.post(
    "/",
    authenticateUser,
    authorize("costcenterplans", ["write"]),
    companyContext,
    ensureCompanyInBodyOrContext(true),
    validate(createCostCenterPlanSchema),
    asyncHandler(createCostCenterPlan)
);

router.get(
    "/",
    authenticateUser,
    authorize("costcenterplans", ["read"]),
    companyContext,
    asyncHandler(listCostCenterPlans)
);

router.put(
    "/:id",
    authenticateUser,
    authorize("costcenterplans", ["write"]),
    companyContext,
    ensureCompanyInBodyOrContext(false),
    validate(updateCostCenterPlanSchema),
    asyncHandler(updateCostCenterPlan)
);

router.delete(
    "/:id",
    authenticateUser,
    authorize("costcenterplans", ["delete"]),
    companyContext,
    asyncHandler(deleteCostCenterPlan)
);

export default router;