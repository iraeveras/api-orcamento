import { CostCenterPlan } from "@/domain/entities/CostCenterPlan";

export type CostCenterPlanFilters = {
    companyId?: number;
    status?: 'active' | 'inactive';
    search?: string; // opcional: filtra por nome/código
};

export interface ICostCenterPlanRepository {
    create(data: Omit<CostCenterPlan, "id" | "createdAt" | "updatedAt">): Promise<CostCenterPlan>;
    update(id: number, data: Partial<CostCenterPlan>): Promise<CostCenterPlan>;
    findById(id: number): Promise<CostCenterPlan | null>;
    list(filters?: CostCenterPlanFilters): Promise<CostCenterPlan[]>;
    delete(id: number): Promise<boolean>;
}