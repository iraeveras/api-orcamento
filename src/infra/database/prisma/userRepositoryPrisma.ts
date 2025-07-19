// FILE: src/infra/database/prisma/userRepositoryPrisma.ts
import prisma from './client';
import { IUserRepository } from '@/domain/repositories/userRepository';
import { User, UserResponse } from '@/domain/entities/User';
import { formatUserResponse } from '@/shared/utils/userResponse';

export function userRepositoryPrisma(): IUserRepository {
    return {
        async create(data) {
            const { companyIds, ...userData } = data;
            // Criação de usuário com relacionamento para companies
            const user = await prisma.user.create({
                data: {
                    ...userData,
                    companies: {
                        create: companyIds?.map(companyId => ({ companyId })) || [],
                    },
                },
                include: {
                    role: { include: { permissions: true } },
                    companies: { include: { company: true } },
                },
            });
            return formatUserResponse(user)
        },

        async update(id, data) {
            const { companyIds, ...userData } = data;
            // Atualiza dados do usuário
            const user = await prisma.user.update({
                where: { id },
                data: {
                    ...userData,
                    ...(companyIds && {
                        companies: {
                            deleteMany: {},
                            create: companyIds.map(companyId => ({ companyId })),
                        },
                    }),
                },
                include: {
                    role: { include: { permissions: true } },
                    companies: { include: { company: true } },
                },
            });

            return formatUserResponse(user)
        },

        async findById(id): Promise<UserResponse | null> {
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                    role: { include: { permissions: true } },
                    companies: { include: { company: true } },
                },
            });
            if (!user) return null;
            return formatUserResponse(user)
        },

        async findByEmail(email) {
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    role: { include: { permissions: true } },
                    companies: { include: { company: true } },
                },
            });
            if (!user) return null;
            return formatUserResponse(user)
        },

        async list() {
            const users = await prisma.user.findMany({
                include: {
                    role: { include: { permissions: true } },
                    companies: { include: { company: true } },
                },
            });
            return users.map(formatUserResponse);
        },

        async delete(id) {
            try {
                await prisma.user.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}