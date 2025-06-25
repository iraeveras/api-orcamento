// FILE: src/infra/database/prisma/userRepositoryPrisma.ts
import prisma from './client';
import { IUserRepository } from '@/domain/repositories/userRepository';
import { User } from '@/domain/entities/User';

export function userRepositoryPrisma(): IUserRepository {
    return {
        async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
            return prisma.user.create({ data });
        },
        async findById(id: number): Promise<User | null> {
            return prisma.user.findUnique({ where: { id } });
        },
        async findByEmail(email: string): Promise<User | null> {
            return prisma.user.findUnique({ where: { email } });
        },
        async list(): Promise<User[]> {
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