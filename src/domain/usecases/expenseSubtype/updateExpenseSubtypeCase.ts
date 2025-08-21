// FILE: src/domain/usecases/expenseSubtype/updateExpenseSubtypeUseCase.ts
import { IExpenseSubtypeRepository } from '@/domain/repositories/expenseSubtypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { ExpenseSubtype } from '@/domain/entities/ExpenseSubtype';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateExpenseSubtypeUseCase(
    repo: IExpenseSubtypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<ExpenseSubtype>, ctx: UpdateContext): Promise<ExpenseSubtype> {
            const old = await repo.findById(id);
            const updated = await repo.update(id, data);

            await audit.log({
                userId: ctx.userId,
                action: 'update',
                entity: 'ExpenseSubtype',
                entityId: String(id),
                oldData: old,
                newData: updated,
                ipAddress: ctx.ipAddress,
            });

            return updated;
        },
    };
}