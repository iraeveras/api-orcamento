import prisma from './client';
import { Prisma } from '@prisma/client';
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
        async update(id, data) {
            return prisma.department.update({
                where: { id },
                data,
            });
        },
        async findById(id) {
            return prisma.department.findUnique({ where: { id } });
        },
        async list() {
            return prisma.department.findMany();
        },
        async delete(id) {
            try {
                await prisma.department.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}