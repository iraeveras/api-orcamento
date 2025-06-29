import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Department } from '@/domain/entities/Department';

interface UpdateContext {
    userId: number;
    ipAddress: string;
}

export function updateDepartmentUseCase(
    departmentRepository: IDepartmentRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(id: number, data: Partial<Department>, context: UpdateContext): Promise<Department> {
            const before = await departmentRepository.findById(id);
            const department = await departmentRepository.update(id, data);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'update',
                entity: 'Department',
                entityId: String(id),
                oldData: before,
                newData: department,
                ipAddress: context.ipAddress,
            });
            return department;
        }
    };
}