import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';

export function listAcquisitionPeriodUseCase(repository: IAcquisitionPeriodRepository) {
    return {
        async execute() {
            return repository.list();
        }
    };
}