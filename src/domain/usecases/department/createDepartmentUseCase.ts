import { IDepartmentRepository } from '@/domain/repositories/departmentRepository';
import { IAuditlogRepository } from '@/domain/repositories/auditlogRepository';
import { Department } from '@/domain/entities/Department';

export interface CreateDepartmentDTO {
    name: string;
    companyId: number;
    status?: string;
}

interface CreateContext {
    userId: number;
    ipAddress: string;
}

export function createDepartmentUseCase(
    departmentRepository: IDepartmentRepository,
    auditlogRepository: IAuditlogRepository
) {
    return {
        async execute(data: CreateDepartmentDTO, context: CreateContext): Promise<Department> {

            const payload = {
                ...data,
                status: data.status ?? 'active'
            }
            const department = await departmentRepository.create(payload);
            await auditlogRepository.log({
                userId: context.userId,
                action: 'create',
                entity: 'Department',
                entityId: String(department.id),
                newData: department,
                ipAddress: context.ipAddress,
            });
            return department;
        }
    };
}
