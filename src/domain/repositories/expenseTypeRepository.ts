// FILE: src/domain/repositories/expenseTypeRepository.ts
import { ExpenseType } from '@/domain/entities/ExpenseType';

export type ExpenseTypeFilters = {
    planoCentroCustoItemId?: number;
    status?: 'active' | 'inactive';
    search?: string; // busca por código / nome
};

export interface IExpenseTypeRepository {
    create(data: Omit<ExpenseType, 'id' | 'createdAt' | 'updatedAt'>): Promise<ExpenseType>;
    update(id: number, data: Partial<ExpenseType>): Promise<ExpenseType>;
    findById(id: number): Promise<ExpenseType | null>;
    list(filters?: ExpenseTypeFilters): Promise<ExpenseType[]>;
    delete(id: number): Promise<boolean>;
}