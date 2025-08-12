import { BudgetPeriodFilters, IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';

export function listBudgetPeriodUseCase(budgetPeriodRepository: IBudgetPeriodRepository) {
    return {
        async execute(filters?: BudgetPeriodFilters) {
            return budgetPeriodRepository.list(filters);
        }
    }
}