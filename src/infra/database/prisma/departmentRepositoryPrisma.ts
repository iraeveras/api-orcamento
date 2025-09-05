// FILE: src/infra/database/prisma/departmentRepositoryPrisma.ts
// FILE: src/infra/database/prisma/departmentRepositoryPrisma.ts
import prisma from './client';
import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';
import { Department } from '@/domain/entities/Department';

export function departmentRepositoryPrisma(): IDepartmentRepository {
    return {
        async create(data) {
            return prisma.department.create({
                data: {
                    name: data.name,
                    companyId: data.companyId,
                    status: data.status ?? 'active',
                },
            });
        },

        async update(id, companyId, data) {
            return prisma.department.update({
                where: { id_companyId: { id, companyId } },
                data,
            });
        },

        async findById(id, companyId) {
            return prisma.department.findUnique({
                where: { id_companyId: { id, companyId } },
            });
        },

        async list(companyId) {
            return prisma.department.findMany({
                where: { companyId },
                orderBy: { name: 'asc' },
            });
        },

        async delete(id, companyId) {
            try {
                await prisma.department.delete({
                    where: { id_companyId: { id, companyId } },
                });
                return true;
            } catch {
                return false;
            }
        },
    };
}