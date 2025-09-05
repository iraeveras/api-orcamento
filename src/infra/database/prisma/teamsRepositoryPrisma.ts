// FILE: src/infra/database/prisma/teamsRepositoryPrisma.ts
import prisma from './client';
import { ITeamsRepository } from '@/domain/repositories/teamsRepository';
import { Team } from '@/domain/entities/Teams';

export function teamsRepositoryPrisma(): ITeamsRepository {
    return {
        async create(data) {
            const { members, ...teamData } = data;

            const created = await prisma.team.create({
                data: {
                    ...teamData,
                    members: members && members.length > 0
                        ? {
                            create: members.map((employeeId: number) => ({
                                employee: { connect: { id: employeeId } }
                            }))
                        }
                        : undefined,
                },
                include: { members: true }
            });

            return {
                ...created,
                members: created.members?.map((m) => m.employeeId)
            };
        },

        async update(id, companyId, data) {
            const { members, ...teamData } = data;

            const updated = await prisma.team.update({
                where: { id_companyId: { id, companyId } },
                data: {
                    ...teamData,
                    ...(members
                        ? {
                            members: {
                                deleteMany: {},
                                create: members.map((employeeId: number) => ({
                                    employee: { connect: { id: employeeId } }
                                }))
                            }
                        }
                        : {}
                    ),
                },
                include: { members: true }
            });

            return {
                ...updated,
                members: updated.members?.map((m) => m.employeeId)
            };
        },

        async findById(id, companyId) {
            const team = await prisma.team.findUnique({
                where: { id_companyId: { id, companyId } },
                include: { members: true }
            });
            if (!team) return null;
            return { ...team, members: team.members.map(m => m.employeeId) };
        },

        async list(companyId) {
            const teams = await prisma.team.findMany({
                where: { companyId },
                include: { members: true }
            });

            return teams.map(team => ({
                ...team,
                members: team.members.map(m => m.employeeId)
            }));
        },

        async delete(id, companyId) {
            try {
                await prisma.team.delete({ where: { id_companyId: { id, companyId } } });
                return true;
            } catch {
                return false;
            }
        }
    };
}