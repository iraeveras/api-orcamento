// FILE: src/domain/usecases/costCenterPlanItem/listCostCenterPlanItemUseCase.ts
import { CostCenterPlanItemFilters, ICostCenterPlanItemRepository } from '@/domain/repositories/costCenterPlanItemRepository';

export function listCostCenterPlanItemUseCase(repo: ICostCenterPlanItemRepository) {
    return {
        async execute(filters?: CostCenterPlanItemFilters) {
            return repo.list(filters);
        },
    };
}