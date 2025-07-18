import prisma from './client';
import { IRolesRepository } from '@/domain/repositories/rolesRepository';
import { Role } from '@/domain/entities/Role';

export function rolesRepositoryPrisma(): IRolesRepository {
    return {
        async create(data) {
            const { permissions, ...roledata } = data;
            return prisma.role.create({ 
                data: {
                    ...roledata,
                    permissions: permissions 
                    ? {
                        create: permissions.map((perm) => ({
                            module: perm.module,
                            actions: perm.actions,
                            scope: perm.scope,
                        })),
                    }
                    : undefined,
                },
                include: { permissions: true },
            });
        },
        async update(id, data: Partial<Role> & { permissions?: any[] }) {
            const { permissions, ...roleData } = data;
            return prisma.role.update({ 
                where: { id }, 
                data: {
                    ...roleData,
                    permissions: permissions 
                    ? {
                        deleteMany: {},
                        create: permissions.map((perm) => ({
                            module: perm.module,
                            actions: perm.actions,
                            scope: perm.scope,
                        })),
                    }
                    : undefined,
                },
                include: { permissions: true },
            });
        },
        async findById(id) {
            return prisma.role.findUnique({ where: { id }, include: { permissions: true } });
        },
        async list() {
            return prisma.role.findMany({ include: { permissions: true } });
        },
        async delete(id) {
            try {
                await prisma.role.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
    };
}