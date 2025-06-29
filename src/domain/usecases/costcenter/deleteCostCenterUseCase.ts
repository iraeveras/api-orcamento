import { ICostCenterRepository } from '@/domain/repositories/costCenterRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteCostCenterUseCase(
    costCenterRepository: ICostCenterRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext) {
            const deleted = await costCenterRepository.delete(id);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'CostCenter',
                entityId: String(id),
                newData: null,
                ipAddress: context.ipAddress
            });

            return deleted;
        }
    };
}
