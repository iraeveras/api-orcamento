// FILE: src/infra/database/prisma/expenseSubtypeRepositoryPrisma.ts
import prisma from './client';
import {
    ExpenseSubtypeFilters,
    IExpenseSubtypeRepository,
} from '@/domain/repositories/expenseSubtypeRepository';
import { ExpenseSubtype } from '@/domain/entities/ExpenseSubtype';

function normalizeStatus(s: string): ExpenseSubtype['status'] {
    return s === 'inactive' ? 'inactive' : 'active';
}

function toDomain(row: any): ExpenseSubtype {
    if (!row) return row;
    return {
        id: row.id,
        tipoDespesaId: row.tipoDespesaId,
        codSubtipoDespesa: row.codSubtipoDespesa,
        nomeSubtipoDespesa: row.nomeSubtipoDespesa,
        status: normalizeStatus(row.status),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export function expenseSubtypeRepositoryPrisma(): IExpenseSubtypeRepository {
    return {
        async create(data) {
            const created = await prisma.expenseSubtype.create({ data: { ...data } });
            return toDomain(created);
        },

        async update(id, data) {
            const updated = await prisma.expenseSubtype.update({
                where: { id },
                data: { ...data },
            });
            return toDomain(updated);
        },

        async findById(id) {
            const found = await prisma.expenseSubtype.findUnique({ where: { id } });
            return found ? toDomain(found) : null;
        },

        async list(filters?: ExpenseSubtypeFilters) {
            const where: any = {};
            if (filters?.tipoDespesaId !== undefined) where.tipoDespesaId = filters.tipoDespesaId;
            if (filters?.status) where.status = filters.status;
            if (filters?.search) {
                where.OR = [
                    { codSubtipoDespesa: { contains: filters.search, mode: 'insensitive' } },
                    { nomeSubtipoDespesa: { contains: filters.search, mode: 'insensitive' } },
                ];
            }

            const rows = await prisma.expenseSubtype.findMany({
                where,
                orderBy: [{ tipoDespesaId: 'asc' }, { codSubtipoDespesa: 'asc' }],
            });

            return rows.map(toDomain);
        },

        async delete(id) {
            try {
                await prisma.expenseSubtype.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}