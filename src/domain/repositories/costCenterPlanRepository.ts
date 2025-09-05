// FILE: src/domain/repositories/costCenterPlanRepository.ts
import { CostCenterPlan } from "@/domain/entities/CostCenterPlan";

export type CostCenterPlanFilters = {
    status?: 'active' | 'inactive';
    search?: string;
};

export interface ICostCenterPlanRepository {
    create(data: Omit<CostCenterPlan, "id" | "createdAt" | "updatedAt">): Promise<CostCenterPlan>;
    update(id: number, companyId: number, data: Partial<CostCenterPlan>): Promise<CostCenterPlan>;
    findById(id: number, companyId: number): Promise<CostCenterPlan | null>;
    list(companyId: number, filters?: CostCenterPlanFilters): Promise<CostCenterPlan[]>;
    delete(id: number, companyId: number): Promise<boolean>;
}