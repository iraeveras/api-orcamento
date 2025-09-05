// FILE: src/infra/database/prisma/sectorRepositoryPrisma.ts
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

        async update(id, companyId, data) {
            return prisma.sector.update({
                where: { id_companyId: { id, companyId } },
                data,
            });
        },

        async findById(id, companyId) {
            return prisma.sector.findUnique({
                where: { id_companyId: { id, companyId } },
            });
        },

        async list(companyId) {
            return prisma.sector.findMany({
                where: { companyId },
                orderBy: [{ departmentId: 'asc' }, { name: 'asc' }],
            });
        },

        async delete(id, companyId) {
            try {
                await prisma.sector.delete({
                    where: { id_companyId: { id, companyId } },
                });
                return true;
            } catch {
                return false;
            }
        },
    };
}