import prisma from './client';
import { IOvertimeRepository } from '@/domain/repositories/overtimeRepository';
import { Overtime } from '@/domain/entities/Overtime';
import { Overtime as DbOvertime, Prisma } from '@prisma/client';

function toNumber(v: Prisma.Decimal | number | null | undefined): number {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'number') return v;
    return Number(v);
}

function toDomain(o: DbOvertime): Overtime {
    return {
        id: o.id,
        year: o.year,
        month: o.month,
        companyId: o.companyId,
        costCenterId: o.costCenterId,
        employeeId: o.employeeId,
        budgetPeriodId: o.budgetPeriodId,

        function: o.function,

        he50Qty: o.he50Qty,
        he100Qty: o.he100Qty,
        holidayDaysQty: o.holidayDaysQty,
        nightHoursQty: o.nightHoursQty,
        normalHours: o.normalHours,
        overtime50: o.overtime50,
        overtime100: o.overtime100,
        holidayHours: o.holidayHours,
        nightShiftHours: o.nightShiftHours,

        overtime50Value: toNumber(o.overtime50Value),
        overtime100Value: toNumber(o.overtime100Value),
        he50Value: toNumber(o.he50Value),
        he100Value: toNumber(o.he100Value),
        holidayValue: toNumber(o.holidayValue),
        nightShiftValue: toNumber(o.nightShiftValue),
        nightValue: toNumber(o.nightValue),
        dsrValue: toNumber(o.dsrValue),
        dsrNightValue: toNumber(o.dsrNightValue),
        additionalValue: toNumber(o.additionalValue),
        totalValue: toNumber(o.totalValue),
        budgetedAmount: toNumber(o.budgetedAmount),
        previousYearTotal: toNumber(o.previousYearTotal),
        variance: toNumber(o.variance),
        variancePercentage: toNumber(o.variancePercentage),

        justification: o.justification ?? undefined,
        status: o.status as unknown as Overtime['status'], // mesmo enum (open/closed/pending)
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
    };
}

export function overtimeRepositoryPrisma(): IOvertimeRepository {
    return {
            // CREATE
        async create(data) {
            // Prisma aceita number nos campos Decimal, então podemos passar "data" direto.
            const created = await prisma.overtime.create({ data });
            return toDomain(created);
        },

        // UPDATE
        async update(id, data) {
            const updated = await prisma.overtime.update({
                where: { id },
                data,
            });
            return toDomain(updated);
        },

        // FIND
        async findById(id) {
            const found = await prisma.overtime.findUnique({ where: { id } });
            return found ? toDomain(found) : null;
        },

        // LIST
        async list() {
            const items = await prisma.overtime.findMany();
            return items.map(toDomain);
        },

        // DELETE
        async delete(id) {
            try {
                await prisma.overtime.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}