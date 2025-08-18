// FILE: src/infra/database/prisma/budgetPeriodRepositoryPrisma.ts
import prisma from './client';
import { IBudgetPeriodRepository, BudgetPeriodFilters } from '@/domain/repositories/budgetPeriodRepository';
import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';
import { Prisma } from '@prisma/client';

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart <= bEnd && bStart <= aEnd;
}

const toDate = (v: Date | string): Date =>
    v instanceof Date ? v : new Date(v);

// Monta somente os campos escalares permitidos no CREATE
function toCreateData(
    raw: Omit<BudgetPeriod, "id" | "createdAt" | "updatedAt">
): Prisma.BudgetPeriodUncheckedCreateInput {
    return {
        year: raw.year,
        companyId: raw.companyId,
        startDate: toDate(raw.startDate),
        endDate: toDate(raw.endDate),
        status: raw.status,
        description: raw.description,
        closedBy: raw.closedBy ?? null,
        closedAt: raw.closedAt ? toDate(raw.closedAt) : null,
        // nenhuma relação aqui
    };
}

// Monta somente os campos escalares permitidos no UPDATE
function toUpdateData(
    raw: Partial<BudgetPeriod>
): Prisma.BudgetPeriodUncheckedUpdateInput {
    const data: Prisma.BudgetPeriodUncheckedUpdateInput = {};

    if (raw.year !== undefined) data.year = raw.year;
    if (raw.companyId !== undefined) data.companyId = raw.companyId;
    if (raw.startDate !== undefined) data.startDate = toDate(raw.startDate as any);
    if (raw.endDate !== undefined) data.endDate = toDate(raw.endDate as any);
    if (raw.status !== undefined) data.status = raw.status;
    if (raw.description !== undefined) data.description = raw.description;
    if (raw.closedBy !== undefined) data.closedBy = raw.closedBy ?? null;
    if (raw.closedAt !== undefined)
        data.closedAt = raw.closedAt ? toDate(raw.closedAt as any) : null;

    // nenhuma relação aqui
    return data;
}

// remove campos que o Prisma não aceita em data: {...}
// function sanitizeCreateData(
//     data: Omit<BudgetPeriod, 'id' | 'createdAt' | 'updatedAt'>
// ) {
//     // Remova quaisquer relações/imutáveis que possam vir no objeto de domínio
//     // (caso você tenha adicionado mais relações no domínio, inclua aqui)
//     // @@ts-expect-error – deletando campos que não vão para o Prisma
//     delete (data as any).overtimes;
//     // @@ts-expect-error – se você adicionou vacations no domínio
//     delete (data as any).vacations;
//     // garantias de tipos Date (se por acaso chegarem strings aqui)
//     const startDate = data.startDate instanceof Date ? data.startDate : new Date(data.startDate);
//     const endDate = data.endDate instanceof Date ? data.endDate : new Date(data.endDate);

//     return { ...data, startDate, endDate };
// }

// function sanitizeUpdateData(data: Partial<BudgetPeriod>) {
//     const clone: any = { ...data };

//     // Campos que NÃO podem ir no "data" do update
//     delete clone.id;
//     delete clone.createdAt;
//     delete clone.updatedAt;

//     // Relações não vão no "data" (a menos que use nested writes explicitamente)
//     delete clone.overtimes;
//     delete clone.vacations;

//     // Normaliza datas se vierem como string
//     if (clone.startDate && !(clone.startDate instanceof Date)) {
//         clone.startDate = new Date(clone.startDate);
//     }
//     if (clone.endDate && !(clone.endDate instanceof Date)) {
//         clone.endDate = new Date(clone.endDate);
//     }

//     return clone as Partial<BudgetPeriod>;
// }

export function budgetPeriodRepositoryPrisma(): IBudgetPeriodRepository {
    return {
        async create(rawData) {
            const data = toCreateData(rawData);

            // evita sobreposição de períodos para a mesma empresa/ano
            const existing = await prisma.budgetPeriod.findMany({
                where: { companyId: data.companyId, year: data.year },
                select: { startDate: true, endDate: true },
            });

            if (existing.some((p) => overlaps(p.startDate, p.endDate, data.startDate as Date, data.endDate as Date))) {
                throw new Error("Já existe período orçamentário sobreposto para este companyId/ano.");
            }
            return prisma.budgetPeriod.create({ 
                data,
                include: {
                    overtimes: true,
                    vacations: true,
                }
            });
        },

        async update(id, rawData) {
            // carrega atual para preencher defaults de validação
            const current = await prisma.budgetPeriod.findUnique({ where: { id } });
            if (!current) throw new Error('BudgetPeriod não encontrado.');

            const clean = toUpdateData(rawData);

            const companyId = (clean.companyId ?? current.companyId) as number;
            const year = (clean.year ?? current.year) as number;
            const startDate =
                (clean.startDate as Date | undefined) ?? current.startDate;
            const endDate = (clean.endDate as Date | undefined) ?? current.endDate;

            // valida sobreposição ignorando o próprio período
            const existing = await prisma.budgetPeriod.findMany({
                where: { companyId, year, id: { not: id } },
                select: { startDate: true, endDate: true },
            });

            if (existing.some((p) => overlaps(p.startDate, p.endDate, startDate, endDate))) {
                throw new Error('Atualização criaria sobreposição de períodos para este companyId/ano.');
            }
            return prisma.budgetPeriod.update({ 
                where: { id }, 
                data: clean,
                include: {
                    overtimes: true,
                    vacations: true,
                }
            });
        },

        async findById(id) {
            return prisma.budgetPeriod.findUnique({ 
                where: { id },
                include: {
                    overtimes: true,
                    vacations: true,
                }
            });
        },

        async list(filters?: BudgetPeriodFilters) {
            const where: any = {};
            if (filters?.companyId) where.companyId = filters.companyId;
            if (filters?.status) where.status = filters.status;
            return prisma.budgetPeriod.findMany({ 
                where, 
                orderBy: { year: 'desc'},
                include: {
                    overtimes: true,
                    vacations: true,
                }
            });
        },
        async delete(id) {
            try {
                await prisma.budgetPeriod.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    }
}