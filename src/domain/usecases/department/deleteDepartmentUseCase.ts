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
        async execute(id: number, context: DeleteContext) {
            const before = await departmentRepository.findById(id);
            const result = await departmentRepository.delete(id);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'delete',
                entity: 'Department',
                entityId: String(id),
                oldData: before,
                ipAddress: context.ipAddress,
            });
            return result;
        }
    };
}