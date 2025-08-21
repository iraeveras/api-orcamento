// FILE: src/domain/usecases/expenseType/updateExpenseTypeUseCase.ts
import { IExpenseTypeRepository } from '@/domain/repositories/expenseTypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { ExpenseType } from '@/domain/entities/ExpenseType';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateExpenseTypeUseCase(
    repo: IExpenseTypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<ExpenseType>, ctx: UpdateContext): Promise<ExpenseType> {
            const old = await repo.findById(id);
            const updated = await repo.update(id, data);

            await audit.log({
                userId: ctx.userId,
                action: 'update',
                entity: 'ExpenseType',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: ctx.ipAddress,
            });

            return updated;
        },
    };
}