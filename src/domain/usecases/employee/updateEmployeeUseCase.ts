// FILE: src/domain/usecases/employee/updadeEmployeeUseCase.ts
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Employee } from '@/domain/entities/Employee';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateEmployeeUseCase(
    employeeRepository: IEmployeeRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Employee>, context: UpdateContext): Promise<Employee> {
            const employee = await employeeRepository.update(id, data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Employee',
                entityId: String(employee.id),
                newData: data,
                ipAddress: context.ipAddress
            });
            return employee;
        }
    };
}