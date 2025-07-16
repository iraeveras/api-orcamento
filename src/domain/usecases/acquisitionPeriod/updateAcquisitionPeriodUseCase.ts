import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateAcquisitionPeriodUseCase(
    repository: IAcquisitionPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<AcquisitionPeriod>, context: UpdateContext): Promise<AcquisitionPeriod> {
            const acquisitionPeriod = await repository.update(id, data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'AcquisitionPeriod',
                entityId: String(id),
                newData: acquisitionPeriod,
                ipAddress: context.ipAddress,
            });
            return acquisitionPeriod;
        }
    };
}