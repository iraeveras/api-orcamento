import prisma from './client';
import { IBudgetPeriodRepository } from '@/domain/repositories/budgetPeriodRepository';
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
        async list() {
            return prisma.budgetPeriod.findMany();
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