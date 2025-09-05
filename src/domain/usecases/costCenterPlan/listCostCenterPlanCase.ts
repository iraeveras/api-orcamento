// FILE: src/domain/usecases/costCenterPlan/listCostCenterPlanUseCase.ts
import { ICostCenterPlanRepository, CostCenterPlanFilters } from "@/domain/repositories/costCenterPlanRepository";
import { CostCenterPlan } from "@/domain/entities/CostCenterPlan";

export function listCostCenterPlanUseCase(repo: ICostCenterPlanRepository) {
    return {
        async execute(companyId: number, filters?: CostCenterPlanFilters): Promise<CostCenterPlan[]> {
            return repo.list(companyId, filters);
        }
    };
}