// FILE: src/domain/usecases/costCenterPlanItem/updateCostCenterPlanItemUseCase.ts
import { ICostCenterPlanItemRepository } from '@/domain/repositories/costCenterPlanItemRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { CostCenterPlanItem } from '@/domain/entities/CostCenterPlanItem';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateCostCenterPlanItemUseCase(
    repo: ICostCenterPlanItemRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<CostCenterPlanItem>, ctx: UpdateContext): Promise<CostCenterPlanItem> {
            const old = await repo.findById(id);
            const updated = await repo.update(id, data);

            await audit.log({
                userId: ctx.userId,
                action: 'update',
                entity: 'CostCenterPlanItem',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: ctx.ipAddress,
            });

            return updated;
        },
    };
}