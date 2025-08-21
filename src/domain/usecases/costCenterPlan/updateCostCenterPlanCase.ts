// FILE: src/domain/usecases/costCenterPlan/updateCostCenterPlanUseCase.ts
import { ICostCenterPlanRepository } from "@/domain/repositories/costCenterPlanRepository";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";
import { CostCenterPlan } from "@/domain/entities/CostCenterPlan";

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateCostCenterPlanUseCase(
    repo: ICostCenterPlanRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<CostCenterPlan>, ctx: UpdateContext): Promise<CostCenterPlan> {
            const old = await repo.findById(id);
            const updated = await repo.update(id, data);

            await audit.log({
                userId: ctx.userId,
                action: 'update',
                entity: 'CostCenterPlan',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: ctx.ipAddress,
            });

            return updated;
        }
    };
}