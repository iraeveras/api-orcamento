// FILE: src/domain/usecases/costCenterPlan/listCostCenterPlanUseCase.ts
import { ICostCenterPlanRepository, CostCenterPlanFilters } from "@/domain/repositories/costCenterPlanRepository";

export function listCostCenterPlanUseCase(repo: ICostCenterPlanRepository) {
    return {
        async execute(filters?: CostCenterPlanFilters) {
            return repo.list(filters);
        }
    };
}