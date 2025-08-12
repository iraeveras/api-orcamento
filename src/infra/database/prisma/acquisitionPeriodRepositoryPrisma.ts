import prisma from './client';
import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';
import { AcquisitionPeriodFilters } from '@/domain/repositories/acquisitionPeriodRepository';
import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

const withEmployee = {
    include: { employee: { select: {id: true, name: true } } },
};

export function acquisitionPeriodRepositoryPrisma(): IAcquisitionPeriodRepository {
    return {
        async create(data) {
            return prisma.acquisitionPeriod.create({
                data: {
                    employeeId: data.employeeId,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    year: data.year,
                    status: data.status ?? 'open',
                },
                ...withEmployee
            });
        },
        async findById(id) {
            return prisma.acquisitionPeriod.findUnique({ 
                where: { id },
                ...withEmployee,
            });
        },
        async list(filters?: AcquisitionPeriodFilters) {
            const where: any = {};
            if (filters?.employeeId) where.employeeId = filters.employeeId;
            if (filters?.status) where.status = filters.status;
            return prisma.acquisitionPeriod.findMany({
                where,
                orderBy: { id: 'desc' },
                ...withEmployee,
            });
        },
        async update(id, data) {
            const payload: any = {
                ...data,
                ...(data.startDate && { startDate: new Date(data.startDate as any) }),
                ...(data.endDate && { endDate: new Date(data.endDate as any) }),
            };
            return prisma.acquisitionPeriod.update({ 
                where: { id }, 
                data: payload,
                ...withEmployee 
            });
        },
        async delete(id) {
            try {
                await prisma.acquisitionPeriod.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}