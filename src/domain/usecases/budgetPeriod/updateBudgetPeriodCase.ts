import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateBudgetPeriodUseCase(
    budgetPeriodRepository: IBudgetPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<BudgetPeriod>, context: UpdateContext): Promise<BudgetPeriod> {
            const old = await budgetPeriodRepository.findById(id);
            const updated = await budgetPeriodRepository.update(id, data);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'BudgetPeriod',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: context.ipAddress,
            });

            return updated;
        }
    }
}