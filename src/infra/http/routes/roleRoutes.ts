import { Router } from "express";
import { createRole, updateRole, listRoles, deleteRole } from "@/infra/http/controllers/roleController";
import { validate } from "@/infra/middlewares/validate";
import { authenticate } from "@/infra/middlewares/authenticate";
import { authorize } from "@/infra/middlewares/authorize";
import { createRoleSchema, updateRoleSchema } from "@/domain/validations/roleSchemas";
import { asyncHandler } from "@/shared/utils/asyncHandler";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("roles", ["write"]),
    validate(createRoleSchema),
    asyncHandler(createRole)
);
router.get(
    "/",
    authenticate,
    authorize("roles", ["read"]),
    asyncHandler(listRoles)
);
router.put(
    "/:id",
    authenticate,
    authorize("roles", ["write"]),
    validate(updateRoleSchema),
    asyncHandler(updateRole)
);
router.delete(
    "/:id",
    authenticate,
    authorize("roles", ["delete"]),
    asyncHandler(deleteRole)
);

export default router;