// FILE: src/domain/usecases/expenseSubtype/deleteExpenseSubtypeUseCase.ts
import { IExpenseSubtypeRepository } from '@/domain/repositories/expenseSubtypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteExpenseSubtypeUseCase(
    repo: IExpenseSubtypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, ctx: DeleteContext): Promise<void> {
            const old = await repo.findById(id);
            await repo.delete(id);

            await audit.log({
                userId: ctx.userId,
                action: 'delete',
                entity: 'ExpenseSubtype',
                entityId: String(id),
                oldData: old,
                ipAddress: ctx.ipAddress,
            });
        },
    };
}