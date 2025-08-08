import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';

export function listBudgetPeriodUseCase(budgetPeriodRepository: IBudgetPeriodRepository) {
    return {
        async execute() {
            return budgetPeriodRepository.list();
        }
    }
}