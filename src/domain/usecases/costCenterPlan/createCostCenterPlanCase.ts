// FILE: src/domain/usecases/costCenterPlan/createCostCenterPlanUseCase.ts
import { ICostCenterPlanRepository } from "@/domain/repositories/costCenterPlanRepository";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";
import { CostCenterPlan } from "@/domain/entities/CostCenterPlan";

interface CreateDTO {
    codPlanoCentroCusto: string;
    nomePlanoCentroCusto: string;
    companyId: number;                // forçado pelo middleware/controller
    status?: 'active' | 'inactive';
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createCostCenterPlanUseCase(
    repo: ICostCenterPlanRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(data: CreateDTO, ctx: CreateContext): Promise<CostCenterPlan> {
            const payload: Omit<CostCenterPlan, 'id' | 'createdAt' | 'updatedAt'> = {
                codPlanoCentroCusto: data.codPlanoCentroCusto,
                nomePlanoCentroCusto: data.nomePlanoCentroCusto,
                companyId: data.companyId,
                status: data.status ?? 'active',
            };

            const plan = await repo.create(payload);

            await audit.log({
                userId: ctx.userId,
                action: 'create',
                entity: 'CostCenterPlan',
                entityId: String(plan.id),
                newData: plan,
                ipAddress: ctx.ipAddress,
            });

            return plan;
        }
    };
}