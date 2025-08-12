import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';

export type BudgetPeriodFilters = {
    companyId?: number;
    status?: 'open' | 'closed' | 'pending';
};

export interface IBudgetPeriodRepository {
    create(data: Omit<BudgetPeriod, 'id' | 'createdAt' | 'updatedAt'>): Promise<BudgetPeriod>;
    update(id: number, data: Partial<BudgetPeriod>): Promise<BudgetPeriod>;
    findById(id: number): Promise<BudgetPeriod | null>;
    list(filters?: BudgetPeriodFilters): Promise<BudgetPeriod[]>;
    delete(id: number): Promise<boolean>;
}