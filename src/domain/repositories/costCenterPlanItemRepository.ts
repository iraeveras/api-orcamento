// FILE: src/domain/repositories/costCenterPlanItemRepository.ts
import { CostCenterPlanItem } from '@/domain/entities/CostCenterPlanItem';

export type CostCenterPlanItemFilters = {
    planoCentroCustoId?: number;
    status?: 'active' | 'inactive';
    search?: string; // busca por código/nome
};

export interface ICostCenterPlanItemRepository {
    create(data: Omit<CostCenterPlanItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CostCenterPlanItem>;
    update(id: number, data: Partial<CostCenterPlanItem>): Promise<CostCenterPlanItem>;
    findById(id: number): Promise<CostCenterPlanItem | null>;
    list(filters?: CostCenterPlanItemFilters): Promise<CostCenterPlanItem[]>;
    delete(id: number): Promise<boolean>;
}