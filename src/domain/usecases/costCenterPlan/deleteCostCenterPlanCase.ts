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
        async execute(id: number, ctx: DeleteContext): Promise<void> {
            const old = await repo.findById(id);
            await repo.delete(id);

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