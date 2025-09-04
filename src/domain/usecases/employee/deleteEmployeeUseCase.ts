// FILE: src/domain/usecases/employee/deleteEmployeeUseCase.ts
import { IEmployeeRepository } from '@/domain/repositories/employeeRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteEmployeeUseCase(
    employeeRepository: IEmployeeRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, companyId: number, context: DeleteContext) {
            await employeeRepository.delete(id, companyId);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Employee',
                entityId: String(id),
                ipAddress: context.ipAddress,
            });
        },
    };
}