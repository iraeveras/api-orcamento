// FILE: src/domain/entities/CostCenterPlan.ts
export type CostCenterPlanStatus = 'active' | 'inactive';

export interface CostCenterPlan {
    id?: number;
    codPlanoCentroCusto: string;
    nomePlanoCentroCusto: string;
    companyId: number;
    status: CostCenterPlanStatus;
    createdAt?: Date;
    updatedAt?: Date;
}