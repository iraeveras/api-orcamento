// FILE: src/infra/database/prisma/employeeRepositoryPrisma.ts
import prisma from './client';
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { Employee } from '@/domain/entities/Employee';

export function employeeRepositoryPrisma(): IEmployeeRepository {
    return {
        async create(data) {
            const { teams, ...employeeData } = data;

            const created = await prisma.employee.create({
                data: {
                    ...employeeData,
                    teams: teams && teams.length
                        ? {
                            create: teams.map((teamId: number) => ({
                                team: { connect: { id: teamId } },
                            })),
                        }
                        : undefined,
                },
                include: { teams: true },
            });

            return {
                ...created,
                teams: created.teams.map(t => t.teamId),
            };
        },

        async findById(id, companyId) {
            const emp = await prisma.employee.findFirst({
                where: { id, companyId },
                include: { teams: true },
            });
            if (!emp) return null;
            return {
                ...emp,
                teams: emp.teams.map(t => t.teamId),
            };
        },

        async list(companyId) {
            const emps = await prisma.employee.findMany({
                where: { companyId },
                include: { teams: true },
            });
            return emps.map(e => ({
                ...e,
                teams: e.teams.map(t => t.teamId),
            }));
        },

        async update(id, companyId, data) {
            const { teams, ...employeeData } = data;

            // valida escopo
            const current = await prisma.employee.findFirst({ where: { id, companyId } });
            if (!current) throw new Error('Employee not found in this company');

            const updated = await prisma.employee.update({
                where: { id },
                data: {
                    ...employeeData,
                    ...(teams
                        ? {
                            teams: {
                                deleteMany: {}, // reseta vínculos
                                create: teams.map((teamId: number) => ({
                                    team: { connect: { id: teamId } },
                                })),
                            },
                        }
                        : {}),
                },
                include: { teams: true },
            });

            return {
                ...updated,
                teams: updated.teams.map(t => t.teamId),
            };
        },

        async delete(id, companyId) {
            const result = await prisma.employee.deleteMany({
                where: { id, companyId },
            });
            return result.count > 0;
        },
    };
}