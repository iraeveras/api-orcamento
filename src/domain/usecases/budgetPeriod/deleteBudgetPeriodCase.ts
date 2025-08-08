import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteBudgetPeriodUseCase(
    budgetPeriodRepository: IBudgetPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, context: DeleteContext): Promise<void> {
            const old = await budgetPeriodRepository.findById(id);
            await budgetPeriodRepository.delete(id);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'BudgetPeriod',
                entityId: String(id),
                oldData: old,
                ipAddress: context.ipAddress,
            });
        }
    }
}