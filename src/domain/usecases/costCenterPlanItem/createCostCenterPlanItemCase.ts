import { ICostCenterPlanItemRepository } from '@/domain/repositories/costCenterPlanItemRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { CostCenterPlanItem } from '@/domain/entities/CostCenterPlanItem';

interface CreateDTO {
    planoCentroCustoId: number;
    codPlanoCentroCustoItem: string;
    nomePlanoCentroCustoItem: string;
    status?: 'active' | 'inactive';
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createCostCenterPlanItemUseCase(
    repo: ICostCenterPlanItemRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(data: CreateDTO, ctx: CreateContext): Promise<CostCenterPlanItem> {
            const created = await repo.create({
                planoCentroCustoId: data.planoCentroCustoId,
                codPlanoCentroCustoItem: data.codPlanoCentroCustoItem,
                nomePlanoCentroCustoItem: data.nomePlanoCentroCustoItem,
                status: data.status ?? 'active',
            });

            await audit.log({
                userId: ctx.userId,
                action: 'create',
                entity: 'CostCenterPlanItem',
                entityId: String(created.id),
                newData: created,
                ipAddress: ctx.ipAddress,
            });

            return created;
        },
    };
}