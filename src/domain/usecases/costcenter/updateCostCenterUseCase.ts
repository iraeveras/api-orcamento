import { ICostCenterRepository } from '@/domain/repositories/costCenterRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { CostCenter } from '@/domain/entities/CostCenter';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateCostCenterUseCase(
    costCenterRepository: ICostCenterRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<CostCenter>, context: UpdateContext): Promise<CostCenter> {
            const costCenter = await costCenterRepository.update(id, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'CostCenter',
                entityId: String(id),
                newData: costCenter,
                ipAddress: context.ipAddress
            });

            return costCenter;
        }
    };
}