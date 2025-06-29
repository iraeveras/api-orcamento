import { ICostCenterRepository } from '@/domain/repositories/costCenterRepository';

export function listCostCenterUseCase(costCenterRepository: ICostCenterRepository) {
    return {
        async execute() {
            return costCenterRepository.list();
        }
    };
}