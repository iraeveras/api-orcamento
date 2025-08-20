import { IExpenseTypeRepository } from '@/domain/repositories/expenseTypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteExpenseTypeUseCase(
    repo: IExpenseTypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(id: number, ctx: DeleteContext): Promise<void> {
            const old = await repo.findById(id);
            await repo.delete(id);

            await audit.log({
                userId: ctx.userId,
                action: 'delete',
                entity: 'ExpenseType',
                entityId: String(id),
                oldData: old,
                ipAddress: ctx.ipAddress,
            });
        },
    };
}