import { AcquisitionPeriodFilters, IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';

export function listAcquisitionPeriodUseCase(repository: IAcquisitionPeriodRepository) {
    return {
        async execute(filters?: AcquisitionPeriodFilters) {
            return repository.list(filters);
        }
    };
}