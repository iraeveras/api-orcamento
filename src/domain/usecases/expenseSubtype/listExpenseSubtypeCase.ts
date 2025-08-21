// FILE: src/domain/usecases/expenseSubtype/listExpenseSubtypeUseCase.ts
import { ExpenseSubtypeFilters, IExpenseSubtypeRepository } from '@/domain/repositories/expenseSubtypeRepository';

export function listExpenseSubtypeUseCase(repo: IExpenseSubtypeRepository) {
    return {
        async execute(filters?: ExpenseSubtypeFilters) {
            return repo.list(filters);
        },
    };
}