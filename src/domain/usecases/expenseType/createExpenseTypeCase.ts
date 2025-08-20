import { IExpenseTypeRepository } from '@/domain/repositories/expenseTypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { ExpenseType } from '@/domain/entities/ExpenseType';

interface CreateDTO {
    planoCentroCustoItemId: number;
    codTipoDespesa: string;
    nomeTipoDespesa: string;
    status?: 'active' | 'inactive';
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createExpenseTypeUseCase(
    repo: IExpenseTypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(data: CreateDTO, ctx: CreateContext): Promise<ExpenseType> {
            const created = await repo.create({
                planoCentroCustoItemId: data.planoCentroCustoItemId,
                codTipoDespesa: data.codTipoDespesa,
                nomeTipoDespesa: data.nomeTipoDespesa,
                status: data.status ?? 'active',
            });

            await audit.log({
                userId: ctx.userId,
                action: 'create',
                entity: 'ExpenseType',
                entityId: String(created.id),
                newData: created,
                ipAddress: ctx.ipAddress,
            });

            return created;
        },
    };
}