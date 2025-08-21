// FILE: src/infra/database/prisma/expenseTypeRepositoryPrisma.ts
import prisma from './client';
import { IExpenseTypeRepository, ExpenseTypeFilters } from '@/domain/repositories/expenseTypeRepository';
import { ExpenseType } from '@/domain/entities/ExpenseType';

function normalizeStatus(s: string): ExpenseType['status'] {
    return s === 'inactive' ? 'inactive' : 'active';
}

function toDomain(row: any): ExpenseType {
    if (!row) return row;
    return {
        id: row.id,
        planoCentroCustoItemId: row.planoCentroCustoItemId,
        codTipoDespesa: row.codTipoDespesa,
        nomeTipoDespesa: row.nomeTipoDespesa,
        status: normalizeStatus(row.status),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export function expenseTypeRepositoryPrisma(): IExpenseTypeRepository {
    return {
        async create(data) {
            const created = await prisma.expenseType.create({ data: { ...data } });
            return toDomain(created);
        },

        async update(id, data) {
            const updated = await prisma.expenseType.update({
                where: { id },
                data: { ...data },
            });
            return toDomain(updated);
        },

        async findById(id) {
            const found = await prisma.expenseType.findUnique({ where: { id } });
            return found ? toDomain(found) : null;
        },

        async list(filters?: ExpenseTypeFilters) {
            const where: any = {};
            if (filters?.planoCentroCustoItemId !== undefined) where.planoCentroCustoItemId = filters.planoCentroCustoItemId;
            if (filters?.status) where.status = filters.status;
            if (filters?.search) {
                where.OR = [
                    { codTipoDespesa: { contains: filters.search, mode: 'insensitive' } },
                    { nomeTipoDespesa: { contains: filters.search, mode: 'insensitive' } },
                ];
            }

            const rows = await prisma.expenseType.findMany({
                where,
                orderBy: [{ planoCentroCustoItemId: 'asc' }, { codTipoDespesa: 'asc' }],
            });

            return rows.map(toDomain);
        },

        async delete(id) {
            try {
                await prisma.expenseType.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}