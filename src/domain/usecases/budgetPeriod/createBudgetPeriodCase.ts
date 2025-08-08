import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';

interface CreateBudgetPeriodDTO {
    year: number;
    companyId: number;
    startDate: Date;
    endDate: Date;
    status: 'open' | 'closed' | 'pending';
    description: string;
    closedBy?: string;
    closedAt?: Date;
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createBudgetPeriodUseCase(
    budgetPeriodRepository: IBudgetPeriodRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateBudgetPeriodDTO, context: CreateContext): Promise<BudgetPeriod> {
            const period = await budgetPeriodRepository.create(data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'BudgetPeriod',
                entityId: String(period.id),
                newData: period,
                ipAddress: context.ipAddress
            });
            return period;
        }
    }
}