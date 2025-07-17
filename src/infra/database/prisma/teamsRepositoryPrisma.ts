import prisma from './client';
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { Team } from '@/domain/entities/Teams';

export function teamsRepositoryPrisma(): ITeamsRepository {
    return {
        async create(data) {
            return prisma.team.create({ data });
        },
        async update(id, data) {
            return prisma.team.update({ where: { id }, data });
        },
        async findById(id) {
            return prisma.team.findUnique({ where: { id } });
        },
        async list() {
            return prisma.team.findMany();
        },
        async delete(id) {
            try {
                await prisma.team.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    }
}