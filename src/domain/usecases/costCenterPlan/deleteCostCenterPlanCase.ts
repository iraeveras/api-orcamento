// FILE: src/domain/usecases/costCenterPlan/deleteCostCenterPlanUseCase.ts
import { ICostCenterPlanRepository } from "@/domain/repositories/costCenterPlanRepository";
import { IAuditlogRepository } from "@/domain/repositories/auditlogRepository";

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteCostCenterPlanUseCase(
    repo: ICostCenterPlanRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, companyId: number, ctx: DeleteContext): Promise<void> {
            const old = await repo.findById(id, companyId);
            await repo.delete(id, companyId);

            await audit.log({
                userId: ctx.userId,
                action: 'delete',
                entity: 'CostCenterPlan',
                entityId: String(id),
                oldData: old,
                ipAddress: ctx.ipAddress,
            });
        }
    };
}