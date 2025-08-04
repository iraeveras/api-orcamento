// FILE: src/infra/database/prisma/employeeRepositoryPrisma.ts
import prisma from './client';
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { Employee } from '@/domain/entities/Employee';

export function employeeRepositoryPrisma(): IEmployeeRepository {
    return {
        async create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
            const { teams, ...employeeData } = data;
            const created = await prisma.employee.create({
                data: {
                    ...employeeData,
                    teams: teams && teams.length ? {
                        create: teams.map((teamId: number) => ({
                            team: { connect: { id: teamId } }
                        })),
                    } : undefined,
                },
                include: { teams: true }
            });

            return {
                ...created,
                teams: created.teams.map(teamMember => teamMember.teamId)
            };
        },
        async findById(id) {
            const employee = await prisma.employee.findUnique({
                where: { id },
                include: { teams: true }
            });
            if (!employee) return null;
            return {
                ...employee,
                teams: employee.teams.map(teamMember => teamMember.teamId)
            };
        },
        async list() {
            const employees = await prisma.employee.findMany({
                include: { teams: true }
            });
            return employees.map(emp => ({
                ...emp,
                teams: emp.teams.map(tm => tm.teamId)
            }));
        },
        async update(id, data: Partial<Employee>): Promise<Employee> {
            const { teams, ...employeeData } = data;

            const updated = await prisma.employee.update({
                where: { id },
                data: {
                    ...employeeData,
                    teams: {
                        deleteMany: {},
                        create: teams && teams.length ? teams.map((teamId: number) => ({
                            team: { connect: { id: teamId } }
                        })) : []
                    },
                },
                include: { teams: true }
            });
            return {
                ...updated,
                teams: updated.teams.map(teamMember => teamMember.teamId)
            };
        },
        async delete(id) {
            try {
                await prisma.employee.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        }
    };
}