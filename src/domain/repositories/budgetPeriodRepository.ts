import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';

export interface IBudgetPeriodRepository {
    create(data: Omit<BudgetPeriod, 'id' | 'createdAt' | 'updatedAt'>): Promise<BudgetPeriod>;
    update(id: number, data: Partial<BudgetPeriod>): Promise<BudgetPeriod>;
    findById(id: number): Promise<BudgetPeriod | null>;
    list(): Promise<BudgetPeriod[]>;
    delete(id: number): Promise<boolean>;
}