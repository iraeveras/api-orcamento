import prisma from './client';
import { ICostCenterRepository } from '@/domain/repositories/costCenterRepository';
import { CostCenter } from '@/domain/entities/CostCenter';

export function costCenterRepositoryPrisma(): ICostCenterRepository {
    return {
        async create(data) {
            return prisma.costCenter.create({
                data: {
                    name: data.name,
                    code: data.code,
                    status: data.status ?? 'active',
                    companyId: data.companyId,
                    departmentId: data.departmentId,
                    sectorId: data.sectorId,
                }
            });
        },
        async findById(id) {
            return prisma.costCenter.findUnique({ where: { id } });
        },
        async list() {
            return prisma.costCenter.findMany();
        },
        async update(id, data) {
            return prisma.costCenter.update({ where: { id }, data });
        },
        async delete(id) {
            try {
                await prisma.costCenter.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}