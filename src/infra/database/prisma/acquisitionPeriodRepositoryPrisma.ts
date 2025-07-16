import prisma from './client';
import { IAcquisitionPeriodRepository } from '@/domain/repositories/acquisitionPeriodRepository';
import { AcquisitionPeriod } from '@/domain/entities/AcquisitionPeriod';

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
                }
            });
        },
        async findById(id) {
            return prisma.acquisitionPeriod.findUnique({ where: { id } });
        },
        async list() {
            return prisma.acquisitionPeriod.findMany();
        },
        async update(id, data) {
            return prisma.acquisitionPeriod.update({ where: { id }, data });
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