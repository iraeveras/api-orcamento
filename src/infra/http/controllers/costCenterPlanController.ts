// FILE: src/infra/http/controllers/costCenterPlanController.ts
import { Request, Response } from "express";
import { costCenterPlanRepositoryPrisma } from "@/infra/database/prisma/costCenterPlanRepositoryPrisma";
import { auditlogRepositoryPrisma } from "@/infra/database/prisma/auditlogRepositoryPrisma";
import { createCostCenterPlanUseCase } from "@/domain/usecases/costCenterPlan/createCostCenterPlanCase";
import { updateCostCenterPlanUseCase } from "@/domain/usecases/costCenterPlan/updateCostCenterPlanCase";
import { listCostCenterPlanUseCase } from "@/domain/usecases/costCenterPlan/listCostCenterPlanCase";
import { deleteCostCenterPlanUseCase } from "@/domain/usecases/costCenterPlan/deleteCostCenterPlanCase";
import { apiResponse } from "@/shared/utils/apiResponse";

const repo = costCenterPlanRepositoryPrisma();
const audit = auditlogRepositoryPrisma();

export async function createCostCenterPlan(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const usecase = createCostCenterPlanUseCase(repo, audit);
    const plan = await usecase.execute(req.body, ctx);
    res.status(201).json(apiResponse(plan));
}

export async function updateCostCenterPlan(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const { id } = req.params;
    const usecase = updateCostCenterPlanUseCase(repo, audit);
    const plan = await usecase.execute(Number(id), req.body, ctx);
    res.status(200).json(apiResponse(plan));
}

export async function listCostCenterPlans(req: Request, res: Response) {
    const usecase = listCostCenterPlanUseCase(repo);
    const companyId = req.query.companyId ? Number(req.query.companyId) : undefined;
    const status = (req.query.status as "active" | "inactive") || undefined;
    const search = (req.query.search as string) || undefined;
    const plans = await usecase.execute({ companyId, status, search });
    res.status(200).json(apiResponse(plans));
}

export async function deleteCostCenterPlan(req: Request, res: Response) {
    const ctx = { userId: req.user?.id || 0, ipAddress: req.ip || '' };
    const { id } = req.params;
    const usecase = deleteCostCenterPlanUseCase(repo, audit);
    await usecase.execute(Number(id), ctx);
    res.status(204).json(apiResponse({ message: 'CostCenterPlan deleted' }));
}