import { CostCenter } from '@/domain/entities/CostCenter';

export interface ICostCenterRepository {
    create(data: Omit<CostCenter, 'id' | 'createdAt' | 'updatedAt'>): Promise<CostCenter>;
    findById(id: number): Promise<CostCenter | null>;
    list(): Promise<CostCenter[]>;
    update(id: number, data: Partial<CostCenter>): Promise<CostCenter>;
    delete(id: number): Promise<boolean>;
}