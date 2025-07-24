import { Router } from "express";
import { createRole, updateRole, listRoles, deleteRole } from "@/infra/http/controllers/roleController";
import { authenticateUser } from "@/infra/middlewares/authenticateUser";
import { authorize } from "@/infra/middlewares/authorize";
import { validate } from "@/infra/middlewares/validate";
import { createRoleSchema, updateRoleSchema } from "@/domain/validations/roleSchemas";
import { asyncHandler } from "@/shared/utils/asyncHandler";

const router = Router();

router.post(
    "/",
    authenticateUser,
    authorize("roles", ["write"]),
    validate(createRoleSchema),
    asyncHandler(createRole)
);
router.get(
    "/",
    authenticateUser,
    authorize("roles", ["read"]),
    asyncHandler(listRoles)
);
router.put(
    "/:id",
    authenticateUser,
    authorize("roles", ["write"]),
    validate(updateRoleSchema),
    asyncHandler(updateRole)
);
router.delete(
    "/:id",
    authenticateUser,
    authorize("roles", ["delete"]),
    asyncHandler(deleteRole)
);

export default router;