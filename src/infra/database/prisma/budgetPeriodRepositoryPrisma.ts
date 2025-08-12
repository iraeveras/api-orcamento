import prisma from './client';
import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';
import { BudgetPeriodFilters } from '@/domain/repositories/budgetPeriodRepository';
import { BudgetPeriod } from '@/domain/entities/BudgetPeriods';

export function budgetPeriodRepositoryPrisma(): IBudgetPeriodRepository {
    return {
        async create(data) {
            return prisma.budgetPeriod.create({ data });
        },
        async update(id, data) {
            return prisma.budgetPeriod.update({ where: { id }, data });
        },
        async findById(id) {
            return prisma.budgetPeriod.findUnique({ where: { id } });
        },
        async list(filters?: BudgetPeriodFilters) {
            const where: any = {};
            if (filters?.companyId) where.companyId = filters.companyId;
            if (filters?.status) where.status = filters.status;
            return prisma.budgetPeriod.findMany({ where, orderBy: { year: 'desc'} });
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