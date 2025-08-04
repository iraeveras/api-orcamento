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
                    members: members && members.length > 0 ? {
                        create: members.map((employeeId: number) => ({
                            employee: {connect: { id: employeeId }}
                        })),
                    }
                    : undefined,
                },
                include: { members: { include: { employee: true } } }
            });
            return {
                ...created,
                members: created.members?.map((m) => m.employeeId)
            };
        },

        async update(id, data) {
            const { members, ...teamData } = data;
            const updated = await prisma.team.update({
                where: { id },
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
                include: { members: { include: { employee: true } } }
            });

            return {
                ...updated,
                members: updated.members?.map((m) => m.employeeId)
            };
        },

        async findById(id) {
            const team = await prisma.team.findUnique({
                where: { id },
                include: { members: { include: { employee: true } } }
            });
            if (!team) return null;
            return { ...team, members: team.members.map(m => m.employeeId) };
        },

        async list() {
            const teams = await prisma.team.findMany({
                include: { members: { include: { employee: true } } }
            });

            return teams.map(team => ({
                ...team,
                members: team.members.map(m => m.employeeId)
            }));
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