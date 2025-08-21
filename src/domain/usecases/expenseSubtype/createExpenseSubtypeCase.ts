// FILE: src/domain/usecases/expenseSubtype/createExpenseSubtypeUseCase.ts
import { IExpenseSubtypeRepository } from '@/domain/repositories/expenseSubtypeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { ExpenseSubtype } from '@/domain/entities/ExpenseSubtype';

interface CreateDTO {
    tipoDespesaId: number;
    codSubtipoDespesa: string;
    nomeSubtipoDespesa: string;
    status?: 'active' | 'inactive';
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createExpenseSubtypeUseCase(
    repo: IExpenseSubtypeRepository,
    audit: IAuditlogRepository
) {
    return {
        async execute(data: CreateDTO, ctx: CreateContext): Promise<ExpenseSubtype> {
            const created = await repo.create({
                tipoDespesaId: data.tipoDespesaId,
                codSubtipoDespesa: data.codSubtipoDespesa,
                nomeSubtipoDespesa: data.nomeSubtipoDespesa,
                status: data.status ?? 'active',
            });

            await audit.log({
                userId: ctx.userId,
                action: 'create',
                entity: 'ExpenseSubtype',
                entityId: String(created.id),
                newData: created,
                ipAddress: ctx.ipAddress,
            });

            return created;
        },
    };
}