// FILE: src/domain/repositories/expenseSubtypeRepository.ts
import { ExpenseSubtype } from '@/domain/entities/ExpenseSubtype';

export type ExpenseSubtypeFilters = {
    tipoDespesaId?: number;
    status?: 'active' | 'inactive';
    search?: string; // busca por código/nome (contains)
};

export interface IExpenseSubtypeRepository {
    create(data: Omit<ExpenseSubtype, 'id' | 'createdAt' | 'updatedAt'>): Promise<ExpenseSubtype>;
    update(id: number, data: Partial<ExpenseSubtype>): Promise<ExpenseSubtype>;
    findById(id: number): Promise<ExpenseSubtype | null>;
    list(filters?: ExpenseSubtypeFilters): Promise<ExpenseSubtype[]>;
    delete(id: number): Promise<boolean>;
}