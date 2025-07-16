import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteAcquisitionPeriodUseCase(
    repository: IAcquisitionPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext) {
            await repository.delete(id);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'AcquisitionPeriod',
                entityId: String(id),
                ipAddress: context.ipAddress,
            });
        }
    };
}