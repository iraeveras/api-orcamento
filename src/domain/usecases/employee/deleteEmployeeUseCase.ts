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
        async execute(id: number, context: DeleteContext) {
            await employeeRepository.delete(id);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Employee',
                entityId: String(id),
                ipAddress: context.ipAddress
            });
        }
    };
}
