// FILE: src/domain/usecases/department/deleteDepartmentUseCase.ts
import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';

interface DeleteContext {
    userId: number;
    ipAddress: string;
}

export function deleteDepartmentUseCase(
    departmentRepository: IDepartmentRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, companyId: number, context: DeleteContext) {
            const before = await departmentRepository.findById(id, companyId);
            const result = await departmentRepository.delete(id, companyId);

            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Department',
                entityId: String(id),
                oldData: before,
                ipAddress: context.ipAddress,
            });

            return result;
        },
    };
}