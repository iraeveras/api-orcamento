import prisma from './client';
import { ISectorRepository } from '@/domain/repositories/sectorRepository';
import { Sector } from '@/domain/entities/Sector';

export function sectorRepositoryPrisma(): ISectorRepository {
    return {
        async create(data) {
            return prisma.sector.create({
                data: {
                    name: data.name,
                    companyId: data.companyId,
                    departmentId: data.departmentId,
                    status: data.status ?? 'active',
                },
            });
        },
        async update(id, data) {
            return prisma.sector.update({
                where: { id },
                data,
            });
        },
        async findById(id) {
            return prisma.sector.findUnique({ where: { id } });
        },
        async list() {
            return prisma.sector.findMany();
        },
        async delete(id) {
            try {
                await prisma.sector.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}