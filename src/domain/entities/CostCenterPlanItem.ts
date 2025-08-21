// FILE: src/domain/entities/CostCenterPlanItem.ts
export type CostCenterPlanItemStatus = 'active' | 'inactive';

export interface CostCenterPlanItem {
    id?: number;
    planoCentroCustoId: number;
    codPlanoCentroCustoItem: string;
    nomePlanoCentroCustoItem: string;
    status: CostCenterPlanItemStatus;
    createdAt?: Date;
    updatedAt?: Date;
}