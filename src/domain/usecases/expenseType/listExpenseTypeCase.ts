// FILE: src/domain/usecases/expenseType/listExpenseTypeUseCase.ts
import { ExpenseTypeFilters, IExpenseTypeRepository } from '@/domain/repositories/expenseTypeRepository';

export function listExpenseTypeUseCase(repo: IExpenseTypeRepository) {
    return {
        async execute(filters?: ExpenseTypeFilters) {
            return repo.list(filters);
        },
    };
}