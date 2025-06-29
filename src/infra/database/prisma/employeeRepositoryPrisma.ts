import prisma from './client';
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { Employee } from '@/domain/entities/Employee';

export function employeeRepositoryPrisma(): IEmployeeRepository {
    return {
        async create(data) {
            return prisma.employee.create({
                data: {
                    matricula: data.matricula,
                    name: data.name,
                    admission: new Date(data.admission),
                    position: data.position,
                    salary: data.salary,
                    dangerPay: data.dangerPay,
                    status: data.status ?? 'Ativo',
                    companyId: data.companyId,
                    departmentId: data.departmentId,
                    sectorId: data.sectorId,
                }
            });
        },
        async findById(id) {
            return prisma.employee.findUnique({ where: { id } });
        },
        async list() {
            return prisma.employee.findMany();
        },
        async update(id, data) {
            return prisma.employee.update({ where: { id }, data });
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