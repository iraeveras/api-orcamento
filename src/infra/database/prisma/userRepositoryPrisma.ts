// FILE: src/infra/database/prisma/userRepositoryPrisma.ts
import prisma from './client';
import { Prisma } from '@prisma/client';
import { IUserRepository } from '@/domain/repositories/userRepository';
import { User } from '@/domain/entities/User';

export function userRepositoryPrisma(): IUserRepository {
    return {
        async create(data: Prisma.UserCreateInput) {
            return prisma.user.create({ data });
        },
        async findById(id) {
            return prisma.user.findUnique({ where: { id } });
        },
        async findByEmail(email) {
            return prisma.user.findUnique({ where: { email } });
        },
        async list() {
            return prisma.user.findMany();
        },
        async update(id, data) {
            return prisma.user.update({ where: { id }, data });
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