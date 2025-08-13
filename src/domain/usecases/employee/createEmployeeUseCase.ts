// FILE: src/domain/usecases/employee/createEmployeeUseCase.ts
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Employee } from '@/domain/entities/Employee';

interface CreateEmployeeDTO {
    matricula: string;
    name: string;
    admission: Date | string;
    position: string;
    salary: number;
    dangerPay: boolean;
    monthlyHours: number;
    workSchedule: string;
    status?: string;
    companyId: number;
    departmentId: number;
    sectorId: number;
    teams: number[];
}
interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createEmployeeUseCase(
    employeeRepository: IEmployeeRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateEmployeeDTO, context: CreateContext): Promise<Employee> {
            const employee = await employeeRepository.create(data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Employee',
                entityId: String(employee.id),
                newData: employee,
                ipAddress: context.ipAddress
            });
            return employee;
        }
    };
}