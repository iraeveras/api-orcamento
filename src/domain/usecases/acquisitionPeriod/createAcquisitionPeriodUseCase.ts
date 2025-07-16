import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

interface CreateAcquisitionPeriodDTO {
    employeeId: number;
    startDate: Date | string;
    endDate: Date | string;
    year: number;
    status?: string;
}
interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createAcquisitionPeriodUseCase(
    repository: IAcquisitionPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateAcquisitionPeriodDTO, context: CreateContext): Promise<AcquisitionPeriod> {
            const acquisitionPeriod = await repository.create(data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'AcquisitionPeriod',
                entityId: String(acquisitionPeriod.id),
                newData: acquisitionPeriod,
                ipAddress: context.ipAddress,
            });
            return acquisitionPeriod;
        }
    };
}